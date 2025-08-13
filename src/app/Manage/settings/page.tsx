import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Settings, Globe, Shield, Mail, Save, RefreshCw } from "lucide-react";
import { Suspense } from "react";
import Loader from "@/components/custom/loader";

const settingsSections = [
  {
    title: "General Settings",
    icon: Settings,
    items: [
      { label: "Site Name", value: "MAT Organization", type: "text" },
      {
        label: "Site Description",
        value: "Making a difference in communities",
        type: "text",
      },
      { label: "Contact Email", value: "contact@mat.org", type: "email" },
      { label: "Contact Phone", value: "+1 (555) 123-4567", type: "tel" },
    ],
  },
  {
    title: "Security Settings",
    icon: Shield,
    items: [
      { label: "Two-Factor Authentication", value: "Enabled", type: "toggle" },
      { label: "Session Timeout", value: "30 minutes", type: "select" },
      { label: "Password Requirements", value: "Strong", type: "select" },
      { label: "Login Attempts", value: "5", type: "number" },
    ],
  },
  {
    title: "Email Settings",
    icon: Mail,
    items: [
      { label: "SMTP Server", value: "smtp.gmail.com", type: "text" },
      { label: "SMTP Port", value: "587", type: "number" },
      { label: "Email Notifications", value: "Enabled", type: "toggle" },
      { label: "Newsletter Signup", value: "Enabled", type: "toggle" },
    ],
  },
];

function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">
            Manage system configuration and preferences
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingsSections.map((section, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <section.icon className="w-5 h-5 text-green-600" />
                {section.title}
              </CardTitle>
              <CardDescription>
                Configure {section.title.toLowerCase()} for your organization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      {item.label}
                    </label>
                    {item.type === "toggle" ? (
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            item.value === "Enabled" ? "default" : "secondary"
                          }
                        >
                          {item.value}
                        </Badge>
                        <Button size="sm" variant="outline">
                          Toggle
                        </Button>
                      </div>
                    ) : item.type === "select" ? (
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{item.value}</Badge>
                        <Button size="sm" variant="outline">
                          Change
                        </Button>
                      </div>
                    ) : (
                      <Input
                        type={item.type}
                        defaultValue={item.value}
                        className="max-w-md"
                      />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-green-600" />
            System Information
          </CardTitle>
          <CardDescription>
            Current system status and version information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Version
              </label>
              <p className="text-sm text-gray-600">v2.1.0</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Last Updated
              </label>
              <p className="text-sm text-gray-600">2024-08-09</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Server Status
              </label>
              <Badge variant="default" className="bg-green-600">
                Online
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <SettingsPage />
    </Suspense>
  );
}
