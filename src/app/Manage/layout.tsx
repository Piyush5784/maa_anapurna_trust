"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Users,
  Settings,
  BarChart3,
  FileText,
  Menu,
  X,
  Home,
  Shield,
  Mail,
  Calendar,
  DollarSign,
  Paperclip,
} from "lucide-react";
import { cn } from "@/lib/utils";
import LogoutButton from "@/components/custom/LogoutButton";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/Manage",
    icon: BarChart3,
  },
  {
    title: "Users",
    href: "/Manage/users",
    icon: Users,
  },
  {
    title: "Finance",
    href: "/Manage/finance",
    icon: DollarSign,
  },
  {
    title: "Stories",
    href: "/Manage/stories",
    icon: Calendar,
  },
  {
    title: "Messages",
    href: "/Manage/communication",
    icon: Mail,
  },
  {
    title: "Content",
    href: "/Manage/content",
    icon: FileText,
  },
  {
    title: "Analytics",
    href: "/Manage/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/Manage/settings",
    icon: Settings,
  },
  {
    title: "Pages",
    href: "/Manage/pages",
    icon: Paperclip,
  },
];

export default function ManageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center">
            <img className="h-8 w-8 rounded-full" src="/logo.jpeg" alt="Logo" />
            <span className="ml-2 text-xl font-semibold text-gray-900">
              Admin Panel
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="mt-4 px-4">
          <div className="space-y-1">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-green-100 text-green-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon
                    className={cn(
                      "mr-3 h-5 w-5 flex-shrink-0",
                      isActive
                        ? "text-green-500"
                        : "text-gray-400 group-hover:text-gray-500"
                    )}
                  />
                  {item.title}
                </Link>
              );
            })}
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <Link
              href="/"
              className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <Home className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
              Back to Site
            </Link>

            <LogoutButton />
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="w-full">
        {/* Top header */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6 ml-auto">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />
              <div className="flex items-center gap-x-4">
                <div className="text-sm font-medium text-gray-900">
                  Admin User
                </div>
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-green-800">A</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
