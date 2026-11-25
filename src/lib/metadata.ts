import type { Metadata } from "next";
import { SITE_URL } from "./constants";

export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  /** Keep out of search results (drafts awaiting the owner's approval). */
  noindex?: boolean;
}): Metadata {
  const url = `${SITE_URL}${opts.path}`;
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    ...(opts.noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
    },
  };
}
