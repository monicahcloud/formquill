import { Badge } from "@/components/ui/badge";
import { Globe } from "lucide-react";

export default function SocialProof({
  integrations,
}: {
  integrations: { name: string; logo: string }[];
}) {
  return (
    <div className="text-center">
      <p className="mb-6 text-sm text-muted-foreground">
        Works seamlessly with your favorite tools
      </p>
      <div className="flex flex-wrap items-center justify-center gap-8">
        {integrations.map((i) => (
          <div
            key={i.name}
            className="flex items-center gap-2 opacity-70 transition-opacity hover:opacity-100">
            <span className="text-2xl">{i.logo}</span>
            <span className="font-medium">{i.name}</span>
          </div>
        ))}
      </div>
      <Badge variant="outline" className="mt-6">
        <Globe className="mr-1 h-3 w-3" />
        Works with Google Sheets
      </Badge>
    </div>
  );
}
