import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import {
  COMPANY,
  FOOTER_COMPANY_LINKS,
  FOOTER_INDUSTRY_LINKS,
  FOOTER_SOLUTIONS_LINKS,
  LOGIN_SUPPORT_LINKS,
} from "@/lib/constants";

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h2 className="text-sm font-bold uppercase tracking-wider text-on-dark-2">
        {title}
      </h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-on-dark-2 hover:text-orange-3"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink text-on-dark">
      <Container className="py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2 sm:col-span-2">
            <span className="font-[family-name:var(--font-heading)] text-xl font-bold text-on-dark">
              {COMPANY.name}
            </span>
            <p className="mt-3 max-w-xs text-sm text-on-dark-2">
              {COMPANY.taglineLong}
            </p>
            <address className="mt-5 space-y-1.5 text-sm not-italic text-on-dark-2">
              <p>{COMPANY.fullAddress}</p>
              <p>
                <a href={COMPANY.phoneHref} className="hover:text-orange-3">
                  {COMPANY.phoneDisplay}
                </a>
              </p>
              <p>
                <a href={COMPANY.emailHref} className="hover:text-orange-3">
                  {COMPANY.email}
                </a>
              </p>
            </address>
          </div>

          <FooterColumn title="Solutions" links={FOOTER_SOLUTIONS_LINKS} />
          <FooterColumn title="Industries" links={FOOTER_INDUSTRY_LINKS} />
          <FooterColumn title="Company" links={FOOTER_COMPANY_LINKS} />

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-on-dark-2">
              Login &amp; Support
            </h2>
            <ul className="mt-4 space-y-2.5">
              {LOGIN_SUPPORT_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-on-dark-2 hover:text-orange-3"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-sm font-bold text-on-dark">
                Stay in the loop
              </h2>
              <p className="mt-1 text-sm text-on-dark-2">
                Product updates, communication tips, and industry insights — no spam.
              </p>
            </div>
            <div className="lg:w-96">
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col-reverse items-start gap-4 border-t border-white/10 pt-6 text-xs text-on-dark-2 sm:flex-row sm:items-center sm:justify-between">
          <p>{COMPANY.copyright}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/privacy-policy" className="hover:text-orange-3">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-orange-3">
              Terms of Service
            </Link>
            <Link href="/legal/911" className="hover:text-orange-3">
              911 Notice
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
