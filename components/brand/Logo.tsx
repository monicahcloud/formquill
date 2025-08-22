// components/brand/Logo.tsx
import Link from "next/link";
import Image from "next/image";

type Props = {
  variant?: "mark" | "full";
  size?: number; // pixel size for the icon
  className?: string;
  title?: string; // accessible label
  href?: string; // e.g. "/" or "/app"
  gap?: number; // px space between icon and text (default 4)
  tighten?: boolean; // pull text slightly left to counter PNG padding
};

export default function Logo({
  variant = "full",
  size = 45,
  className,
  title = "FormQuill",
  href,
  gap = 4,
  tighten = true,
}: Props) {
  const mark = (
    <Image
      src="/logo.png"
      alt={title}
      width={size}
      height={size}
      priority={false}
      className={className}
    />
  );

  const full = (
    <span
      className={`inline-flex items-center ${className ?? ""}`}
      style={{ columnGap: gap }} // control spacing precisely
    >
      {mark}
      <strong
        className={tighten ? "-ml-1" : undefined} // nudge text ~4px closer
        style={{
          backgroundImage: "var(--gradient-hero)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          lineHeight: 1,
        }}>
        FormQuill
      </strong>
    </span>
  );

  const content = variant === "mark" ? mark : full;

  return href ? (
    <Link href={href} aria-label={title} className="inline-flex items-center">
      {content}
    </Link>
  ) : (
    content
  );
}
