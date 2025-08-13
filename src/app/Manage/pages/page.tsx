import Loader from "@/components/custom/loader";
import { Topbar } from "@/components/custom/topbar";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Pages | MAT",
  description: "Explore all available pages and resources on our website.",
};

function PagesPage() {
  const pageCategories = [
    {
      title: "Main Pages",
      pages: [
        {
          name: "Home",
          href: "/",
          description: "Welcome to our organization",
          status: "working",
        },
        {
          name: "About",
          href: "/About",
          description: "Learn about our mission and values",
          status: "working",
        },
        {
          name: "Services",
          href: "/Services",
          description: "Discover our community services",
          status: "working",
        },
        {
          name: "Contact",
          href: "/Contact",
          description: "Get in touch with us",
          status: "working",
        },
        {
          name: "Stories",
          href: "/Stories",
          description: "Read inspiring community stories",
          status: "working",
        },
      ],
    },
    {
      title: "Authentication",
      pages: [
        {
          name: "Sign In",
          href: "/auth/signin",
          description: "Sign in to your account",
          status: "working",
        },
        {
          name: "Error Page",
          href: "/auth/error",
          description: "Authentication error page",
          status: "working",
        },
        {
          name: "Verify Request",
          href: "/auth/verify-request",
          description: "Email verification page",
          status: "working",
        },
      ],
    },
    {
      title: "Management Dashboard",
      pages: [
        {
          name: "Dashboard",
          href: "/Manage",
          description: "Main management dashboard",
          status: "working",
        },
        {
          name: "User Management",
          href: "/Manage/users",
          description: "Manage user accounts",
          status: "working",
        },
        {
          name: "Events",
          href: "/Manage/events",
          description: "Create and manage events",
          status: "working",
        },
        {
          name: "Content",
          href: "/Manage/content",
          description: "Manage website content",
          status: "working",
        },
        {
          name: "Analytics",
          href: "/Manage/analytics",
          description: "View site analytics",
          status: "working",
        },
        {
          name: "Finance",
          href: "/Manage/finance",
          description: "Financial management",
          status: "working",
        },
        {
          name: "Communication",
          href: "/Manage/communication",
          description: "Manage communications",
          status: "working",
        },
        {
          name: "Settings",
          href: "/Manage/settings",
          description: "System settings",
          status: "working",
        },
      ],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "working":
        return "text-green-600 bg-green-100";
      case "maintenance":
        return "text-yellow-600 bg-yellow-100";
      case "error":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Site Pages</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Navigate through all available pages and sections of our website.
              Find exactly what you're looking for.
            </p>
          </div>

          {/* Pages Grid */}
          <div className="space-y-12">
            {pageCategories.map((category, idx) => (
              <div key={idx}>
                <h2 className="text-2xl font-semibold mb-6 border-b pb-2">
                  {category.title}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.pages.map((page, pageIdx) => (
                    <Link
                      key={pageIdx}
                      href={page.href}
                      className="block group"
                    >
                      <div className="bg-card p-6 rounded-lg shadow-sm border hover:shadow-md transition-all duration-200 group-hover:border-primary/50">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                              {page.name}
                            </h3>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                page.status
                              )}`}
                            >
                              {page.status}
                            </span>
                          </div>
                          <svg
                            className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          {page.description}
                        </p>
                        <div className="mt-4 text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded">
                          {page.href}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-16 bg-muted p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Quick Actions
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href="/Contact"
                className="bg-primary text-primary-foreground p-4 rounded-lg text-center hover:bg-primary/90 transition-colors"
              >
                <div className="font-semibold">Contact Us</div>
                <div className="text-sm opacity-90">Get in touch</div>
              </Link>
              <Link
                href="/Services"
                className="bg-secondary text-secondary-foreground p-4 rounded-lg text-center hover:bg-secondary/90 transition-colors"
              >
                <div className="font-semibold">Our Services</div>
                <div className="text-sm opacity-90">What we offer</div>
              </Link>
              <Link
                href="/Stories"
                className="bg-accent text-accent-foreground p-4 rounded-lg text-center hover:bg-accent/90 transition-colors"
              >
                <div className="font-semibold">Success Stories</div>
                <div className="text-sm opacity-90">Read inspiring tales</div>
              </Link>
            </div>
          </div>

          {/* Search Section */}
          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold mb-4">
              Looking for something specific?
            </h3>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Try browsing our main sections
              or contact us for assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="border border-input px-6 py-2 rounded-lg hover:bg-accent transition-colors"
              >
                Back to Home
              </Link>
              <Link
                href="/Contact"
                className="border border-input px-6 py-2 rounded-lg hover:bg-accent transition-colors"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <PagesPage />
    </Suspense>
  );
}
