import { ReactNode } from "react";
import { Container } from "./Container";

export function Section({
  children,
  id,
  className = "",
  dark = false,
  containerClassName = "",
}: {
  children: ReactNode;
  id?: string;
  className?: string;
  dark?: boolean;
  containerClassName?: string;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 py-16 sm:py-20 lg:py-24 ${
        dark ? "bg-ink text-on-dark" : ""
      } ${className}`}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  dark = false,
  center = true,
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  dark?: boolean;
  center?: boolean;
  /** Use "h1" for the single, primary heading of a page. Defaults to "h2". */
  as?: "h1" | "h2";
}) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow ? (
        <p
          className={`text-xs font-bold uppercase tracking-[0.15em] ${
            dark ? "text-orange-3" : "text-label"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <Heading
        className={`mt-2 font-[family-name:var(--font-heading)] text-3xl font-bold sm:text-4xl ${
          dark ? "text-on-dark" : "text-ink"
        }`}
      >
        {title}
      </Heading>
      {description ? (
        <p className={`mt-4 text-lg ${dark ? "text-on-dark-2" : "text-muted"}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
