export const metadata = {
  title: {
    default: "FormQuill — Smart forms, simpler work.",
    template: "%s — FormQuill",
  },
  // marketing-specific meta/OG here
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
