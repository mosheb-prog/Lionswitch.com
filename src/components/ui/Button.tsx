import Link from "next/link";
import { ReactNode } from "react";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold font-[family-name:var(--font-heading)] transition-[background-color,box-shadow,transform] duration-200 px-6 py-3 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0";

const VARIANTS = {
  primary:
    "bg-orange text-ink hover:bg-orange-3 shadow-[0_0_0_0_rgba(245,138,11,0)] hover:shadow-[0_8px_28px_-6px_rgba(245,138,11,0.65)]",
  dark: "bg-ink text-on-dark hover:bg-ink/90",
  ghost:
    "bg-transparent text-ink ring-1 ring-inset ring-soft-border hover:ring-orange",
  ghostOnDark:
    "bg-transparent text-on-dark ring-1 ring-inset ring-white/25 hover:ring-orange hover:shadow-[0_8px_28px_-10px_rgba(245,138,11,0.5)]",
} as const;

type Variant = keyof typeof VARIANTS;

type BaseProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

type LinkButtonProps = BaseProps & {
  href: string;
  target?: string;
  rel?: string;
  onClick?: never;
  type?: never;
  disabled?: never;
};

type ActionButtonProps = BaseProps & {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  "aria-expanded"?: boolean;
  "aria-haspopup"?: boolean | "menu" | "dialog" | "listbox" | "tree" | "grid";
  "aria-label"?: string;
};

export function Button(props: LinkButtonProps | ActionButtonProps) {
  const { variant = "primary", className = "", children } = props;
  const classes = `${BASE} ${VARIANTS[variant]} ${className}`;

  if ("href" in props && props.href) {
    const isExternal =
      /^https?:\/\//.test(props.href) ||
      props.href.startsWith("tel:") ||
      props.href.startsWith("mailto:");

    if (isExternal) {
      return (
        <a href={props.href} className={classes} target={props.target} rel={props.rel}>
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  const actionProps = props as ActionButtonProps;
  return (
    <button
      type={actionProps.type ?? "button"}
      className={classes}
      onClick={actionProps.onClick}
      disabled={actionProps.disabled}
      aria-expanded={actionProps["aria-expanded"]}
      aria-haspopup={actionProps["aria-haspopup"]}
      aria-label={actionProps["aria-label"]}
    >
      {children}
    </button>
  );
}
