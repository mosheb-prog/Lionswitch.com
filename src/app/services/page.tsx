import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { JsonLd, breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { SERVICES, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = pageMetadata({
  title: "Enterprise Cloud Communications Services",
  description:
    "Six service lines on one platform: business phone & Cloud PBX, UCaaS, contact center, AI & analytics, business messaging, and integrations.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "Services", url: `${SITE_URL}/services` },
        ])}
      />
      {SERVICES.map((service) => (
        <JsonLd
          key={service.slug}
          data={serviceSchema({
            name: service.title,
            description: service.description,
            url: `${SITE_URL}/services/${service.slug}`,
          })}
        />
      ))}

      <Section className="pb-0">
        <SectionHeading
          eyebrow="Services"
          title="Enterprise Cloud Communications Services"
          description="Six service lines on one platform, consolidating your voice, messaging, video and analytics vendors into one bill."
        />
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group rounded-3xl border border-line bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-orange/10"
            >
              <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-ink group-hover:text-label">
                {service.title}
              </h2>
              <p className="mt-2 text-sm text-muted">{service.shortDescription}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-label">
                Learn more
                <span aria-hidden="true">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-14 rounded-3xl bg-ink p-10 text-center text-on-dark">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold">
            See it on your own numbers
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-on-dark-2">
            Get a free demo or a free 30-minute consultation — no pressure,
            no sales scripts.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Button href="/contact#demo" variant="primary">
              Schedule a Free Demo
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
