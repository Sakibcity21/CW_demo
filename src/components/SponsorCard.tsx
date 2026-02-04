import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sponsor } from "@/data/sponsors";

interface SponsorCardProps {
  sponsor: Sponsor;
}

export const SponsorCard = ({ sponsor }: SponsorCardProps) => {
  const CardWrapper = sponsor.url ? "a" : "div";
  const cardProps = sponsor.url
    ? { href: sponsor.url, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <CardWrapper {...cardProps} className="block">
      <Card className="glass-card border-none h-full cursor-pointer transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-cyan-500/20">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center h-28 mb-4">
            <img
              src={sponsor.logo}
              alt={sponsor.name}
              className="max-h-full max-w-[180px] object-contain filter-saturate-105 transition-filter duration-300"
            />
          </div>
          <CardTitle className="link-underline-gradient">{sponsor.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-center text-muted-foreground">
            {sponsor.description}
          </CardDescription>
        </CardContent>
      </Card>
    </CardWrapper>
  );
};
