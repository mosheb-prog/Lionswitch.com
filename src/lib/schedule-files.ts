// Holiday schedule uploads ("upload the closing schedule you already send out").
// Files are checked by their first bytes, not just their name, and only common
// document and image types are accepted.

export const MAX_SCHEDULE_FILES = 3;
export const MAX_SCHEDULE_BYTES = 10 * 1024 * 1024; // total across all files

export const SCHEDULE_ACCEPT =
  ".pdf,.png,.jpg,.jpeg,.webp,.heic,.doc,.docx,.xls,.xlsx,.csv,.txt,application/pdf,image/*";

const EXT_MIME: Record<string, string> = {
  pdf: "application/pdf",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  heic: "image/heic",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  csv: "text/csv",
  txt: "text/plain",
};

const ext = (name: string) => (name.split(".").pop() || "").toLowerCase();

/** The file's real type from its first bytes (and extension for zip / text formats), or null if not allowed. */
export function sniffSchedule(name: string, buf: Uint8Array): string | null {
  const e = ext(name);
  const starts = (...b: number[]) => b.every((v, i) => buf[i] === v);
  const ascii = (from: number, s: string) => [...s].every((c, i) => buf[from + i] === c.charCodeAt(0));
  if (ascii(0, "%PDF")) return EXT_MIME.pdf;
  if (starts(0x89, 0x50, 0x4e, 0x47)) return EXT_MIME.png;
  if (starts(0xff, 0xd8, 0xff)) return EXT_MIME.jpeg;
  if (ascii(0, "RIFF") && ascii(8, "WEBP")) return EXT_MIME.webp;
  if (ascii(4, "ftyp") && ["heic", "heix", "mif1", "msf1", "hevc"].some((b) => ascii(8, b))) return EXT_MIME.heic;
  if (starts(0x50, 0x4b, 0x03, 0x04) && (e === "docx" || e === "xlsx")) return EXT_MIME[e];
  if (starts(0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1) && (e === "doc" || e === "xls")) return EXT_MIME[e];
  if ((e === "csv" || e === "txt") && !buf.subarray(0, 4096).includes(0)) return EXT_MIME[e];
  return null;
}

export function safeFileName(name: string) {
  const cleaned = name.replace(/[^\w.\- ()]/g, "_").replace(/\s+/g, " ").trim().slice(0, 120);
  return cleaned || "schedule";
}
