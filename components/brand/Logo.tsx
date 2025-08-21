type Props = {
  variant?: "mark" | "full";
  size?: number; // pixels
  className?: string;
  title?: string;
};

export default function Logo({
  variant = "mark",
  size = 28,
  className,
  title = "FormQuill",
}: Props) {
  if (variant === "mark") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        role="img"
        aria-label={title}
        className={className}>
        <defs>
          <linearGradient id="fqGradReact" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary, 252 100% 66%))" />
            <stop offset="100%" stopColor="hsl(var(--accent, 189 94% 43%))" />
          </linearGradient>
          <mask id="fqMaskReact">
            <polygon points="12,2 22,12 12,22 2,12" fill="white" />
            <circle cx="12" cy="12" r="2.5" fill="black" />
            <path
              d="M8.2 12.1l2.4 2.4 5.6-5.6"
              stroke="black"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </mask>
        </defs>
        <circle
          cx="12"
          cy="12"
          r="10.5"
          fill="url(#fqGradReact)"
          opacity=".08"
        />
        <rect
          x="2"
          y="2"
          width="20"
          height="20"
          fill="url(#fqGradReact)"
          mask="url(#fqMaskReact)"
          rx="4"
          ry="4"
        />
      </svg>
    );
  }

  // full wordmark
  return (
    <div
      className={className}
      style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <Logo variant="mark" size={size} />
      <span
        style={{
          fontWeight: 800,
          fontSize: Math.round(size * 0.9),
          backgroundImage:
            "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          lineHeight: 1,
          letterSpacing: 0.2,
          fontFamily:
            "Inter, Geist, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        }}
        aria-label={title}>
        FormQuill
      </span>
    </div>
  );
}
