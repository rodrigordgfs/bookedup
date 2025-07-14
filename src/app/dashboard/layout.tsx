import { ProtectedRoute } from "@/components/auth/protected-route";
import { useUser } from '@clerk/nextjs';
import { AuthLoading } from '@/components/auth/auth-loading';
import ClientAccess from './ClientAccess';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientAccess>
      <div className="flex h-screen bg-background">
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </ClientAccess>
  );
} 