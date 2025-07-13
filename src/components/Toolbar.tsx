import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { UserMenu } from './auth/user-menu';
import { DrawerMenu } from './DrawerMenu';
import { NotificationsDropdown } from './NotificationsDropdown';

interface ToolbarProps {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  showDrawer?: boolean;
  showNotifications?: boolean;
  showUserMenu?: boolean;
  showThemeToggle?: boolean;
  rightActions?: React.ReactNode;
  navLinks?: Array<{ label: string; href: string }>;
  className?: string;
  user?: any;
}

export function Toolbar({
  title = 'BookedUp',
  subtitle,
  icon = <User className="w-6 h-6 text-white" />,
  showDrawer = false,
  showNotifications = false,
  showUserMenu = false,
  showThemeToggle = true,
  rightActions,
  navLinks = [],
  className = '',
  user,
}: ToolbarProps) {
  return (
    <header className={cn('bg-card shadow-sm border-b sticky top-0 z-50', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            {showDrawer && <DrawerMenu user={user} />}
            <div className="w-10 h-10 bg-gradient-to-r from-zinc-800 to-zinc-600 rounded-lg flex items-center justify-center">
              {icon}
            </div>
            <div>
              <span className="text-xl font-bold text-foreground">{title}</span>
              {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
            </div>
          </div>
          {navLinks.length > 0 && (
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
          <div className="flex items-center space-x-4">
            {showNotifications && <NotificationsDropdown />}
            {showThemeToggle && <ThemeToggle />}
            {showUserMenu && <UserMenu />}
            {rightActions}
          </div>
        </div>
      </div>
    </header>
  );
} 