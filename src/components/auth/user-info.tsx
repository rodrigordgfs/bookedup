"use client";

import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Mail, Phone } from "lucide-react";

export function UserInfo() {
  const { user, isLoaded } = useUser();

  if (!isLoaded || !user) {
    return null;
  }

  const initials = user.firstName && user.lastName 
    ? `${user.firstName[0]}${user.lastName[0]}`
    : user.emailAddresses[0]?.emailAddress[0]?.toUpperCase() || "U";

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.imageUrl} alt={user.fullName || "Usuário"} />
            <AvatarFallback className="text-lg">{initials}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">{user.fullName || "Usuário"}</h3>
            <Badge variant="secondary" className="text-xs">
              {user.primaryEmailAddress?.emailAddress}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Mail className="h-4 w-4" />
          <span>{user.primaryEmailAddress?.emailAddress}</span>
        </div>
        {user.phoneNumbers?.[0] && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span>{user.phoneNumbers[0].phoneNumber}</span>
          </div>
        )}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Membro desde {user.createdAt ? new Date(user.createdAt).toLocaleDateString('pt-BR') : 'N/A'}</span>
        </div>
      </CardContent>
    </Card>
  );
} 