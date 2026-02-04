import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Linkedin, Github } from "lucide-react";
import { Member } from "@/data/members";

interface MemberCardProps {
  member: Member;
}

export const MemberCard = ({ member }: MemberCardProps) => {
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <Card className="glass-card border-none overflow-hidden rounded-2xl hover:scale-[1.02] transition-transform duration-300">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <Avatar className="h-24 w-24 border-4 border-primary/20 shadow-sm transform-gpu transition-all duration-300 hover:scale-105">
            <AvatarImage src={member.image} alt={member.name} />
            <AvatarFallback className="text-2xl gradient-primary text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div>
            <h3 className="font-semibold text-lg">{member.name}</h3>
            <p className="text-sm text-muted-foreground">{member.role}</p>
          </div>

          <div className="flex gap-2">
            {member.linkedin && (
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full p-2 bg-background/30 hover:bg-primary/8 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30">
                <Linkedin className="h-4 w-4 text-muted-foreground hover:text-primary" />
              </a>
            )}
            {member.github && (
              <a href={member.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full p-2 bg-background/30 hover:bg-primary/8 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30">
                <Github className="h-4 w-4 text-muted-foreground hover:text-primary" />
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
