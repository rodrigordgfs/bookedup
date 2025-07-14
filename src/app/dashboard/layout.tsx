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