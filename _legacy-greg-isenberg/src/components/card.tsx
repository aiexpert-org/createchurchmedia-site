import Link from "next/link";
import { cn } from "@/lib/cn";

export function Card({
  className,
  children,
  as: As = "div",
}: {
  className?: string;
  children: React.ReactNode;
  as?: "div" | "article" | "li";
}) {
  return (
    <As
      className={cn(
        "rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-7 transition-colors hover:border-[color:var(--color-accent)]/60",
        className,
      )}
    >
      {children}
    </As>
  );
}

export function LinkCard({
  href,
  className,
  children,
  ariaLabel,
  cta = "Read more",
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
  cta?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={cn(
        "group block rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-7 transition-colors hover:border-[color:var(--color-accent)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)]",
        className,
      )}
    >
      {children}
      <span className="mt-6 inline-block text-sm font-medium text-[color:var(--color-ink)] underline decoration-[color:var(--color-accent)] decoration-2 underline-offset-4 group-hover:decoration-[color:var(--color-ink)]">
        {cta}
      </span>
    </Link>
  );
}
