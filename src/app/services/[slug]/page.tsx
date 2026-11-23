import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/metadata";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
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
  if (!service) notFound();

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

      <Section className="pb-0">
        <SectionHeading
          as="h1"
          eyebrow="Services"
          title={service.title}
          description={service.description}
        />
      </Section>

      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-ink">
            What&apos;s included
          </h2>
          <ul className="mt-6 space-y-3">
            {service.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3 text-muted">
                <span aria-hidden="true" className="mt-1 text-orange">
                  &#9679;
                </span>
                {bullet}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/contact#demo" variant="primary">
              Schedule a Free Demo
            </Button>
            <Button href="/services" variant="ghost">
              See all services
            </Button>
          </div>
        </div>
      </Section>
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
