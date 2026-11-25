import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { DetailPage } from "@/components/detail/DetailPage";
import { getServiceDetail } from "@/lib/service-details";
import { JsonLd, breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { SERVICES, SITE_URL } from "@/lib/constants";

type Params = PageProps<"/services/[slug]">["params"];

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

function getService(slug: string) {
  return SERVICES.find((service) => service.slug === slug);
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.title,
    description: service.description,
    path: `/services/${service.slug}`,
  });
}

async function ServiceDetailContent({ params }: { params: Params }) {
  const { slug } = await params;
  const service = getService(slug);
  const detail = getServiceDetail(slug);
  if (!service || !detail) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "Services", url: `${SITE_URL}/services` },
          { name: service.title, url: `${SITE_URL}/services/${service.slug}` },
        ])}
      />
      <JsonLd
        data={serviceSchema({
          name: service.title,
          description: service.description,
          url: `${SITE_URL}/services/${service.slug}`,
        })}
      />

      <DetailPage content={detail} />
    </>
  );
}

export default function ServiceDetailPage({ params }: PageProps<"/services/[slug]">) {
  return (
    <Suspense
      fallback={
        <Section className="pb-0">
          <p className="text-center text-muted">Loading…</p>
        </Section>
      }
    >
      <ServiceDetailContent params={params} />
    </Suspense>
  );
}
