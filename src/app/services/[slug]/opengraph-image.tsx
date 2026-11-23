import { createOgImage, OG_SIZE } from "@/lib/og";
import { SERVICES } from "@/lib/constants";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Lion Switch Service";

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES.find((item) => item.slug === slug);
  return createOgImage(service?.title ?? "Lion Switch Services", service?.shortDescription);
}
