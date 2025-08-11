import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  Mail,
  Phone,
  Plus,
  Eye,
  Reply,
  Archive,
  Star,
  Clock,
} from "lucide-react";
import { getAllMessage, getContactStats } from "@/lib/actions/contact";
import { Contact } from "@/generated/prisma";

// Helper function to format date
function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

// Helper function to get subject display name
function getSubjectDisplayName(subject: string) {
  const subjectMap: Record<string, string> = {
    GENERAL: "General Inquiry",
    SERVICES: "Services",
    VOLUNTEER: "Volunteer",
    DONATION: "Donation",
    PARTNERSHIP: "Partnership",
    SUPPORT: "Support",
    OTHER: "Other",
  };
  return subjectMap[subject] || subject;
}

// Helper function to get subject color
function getSubjectColor(subject: string) {
  const colorMap: Record<string, string> = {
    GENERAL: "bg-blue-600",
    SERVICES: "bg-green-600",
    VOLUNTEER: "bg-purple-600",
    DONATION: "bg-yellow-600",
    PARTNERSHIP: "bg-orange-600",
    SUPPORT: "bg-red-600",
    OTHER: "bg-gray-600",
  };
  return colorMap[subject] || "bg-gray-600";
}

export default async function CommunicationPage() {
  // Fetch data from the database
  const [messagesResult, statsResult] = await Promise.all([
    getAllMessage(),
    getContactStats(),
  ]);

  const messages: Contact[] = messagesResult.success
    ? messagesResult.data || []
    : [];
  const stats = statsResult.success
    ? statsResult.data
    : {
        totalMessages: 0,
        thisWeek: 0,
        today: 0,
        messagesBySubject: [],
      };

  // Calculate some additional stats
  const recentMessages = messages.slice(0, 5); // Show latest 5 messages

  const communicationStats = [
    {
      metric: "Total Messages",
      value: stats?.totalMessages.toString() || "0",
      change: `+${stats?.thisWeek || 0}`,
      period: "This Week",
    },
    {
      metric: "New Today",
      value: stats?.today.toString() || "0",
      change: "+0",
      period: "Today",
    },
    {
      metric: "Response Rate",
      value: "94%",
      change: "+2%",
      period: "This Month",
    },
    {
      metric: "Avg Response Time",
      value: "2.4h",
      change: "-0.3h",
      period: "This Week",
    },
  ];

  const messageTypes =
    stats?.messagesBySubject?.map((item) => ({
      type: getSubjectDisplayName(item.subject),
      count: item.count.toString(),
      color: getSubjectColor(item.subject),
    })) || [];
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Communication</h1>
          <p className="text-gray-600 mt-1">
            Manage messages, emails, and communication with supporters
          </p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          New Message
        </Button>
      </div>

      {/* Communication Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {communicationStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-sm font-medium text-gray-900">{stat.metric}</p>
              <p className="text-sm text-gray-600">
                {stat.change} {stat.period}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Messages */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-green-600" />
                  Recent Messages
                </CardTitle>
                <CardDescription>
                  Latest messages and inquiries received
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Archive className="w-4 h-4 mr-2" />
                  Archive
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View All
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMessages.length > 0 ? (
                recentMessages.map((message) => (
                  <div
                    key={message.id}
                    className="border rounded-lg p-4 hover:bg-gray-50"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">
                          {message.firstName} {message.lastName}
                        </h4>
                        <Badge variant="outline">
                          {getSubjectDisplayName(message.subject)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="default">New</Badge>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <Reply className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Archive className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {message.email}
                    </p>
                    <h5 className="font-medium text-sm mb-1">
                      {getSubjectDisplayName(message.subject)} Inquiry
                    </h5>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {message.message}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDate(message.createdAt)}
                      </div>
                      {message.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {message.phone}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No messages yet</p>
                  <p className="text-sm">
                    Contact form submissions will appear here
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Message Types */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-green-600" />
              Message Types
            </CardTitle>
            <CardDescription>
              Distribution of messages by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {messageTypes.map((type, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${type.color}`}></div>
                    <span className="font-medium">{type.type}</span>
                  </div>
                  <Badge variant="outline">{type.count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-green-600" />
              Email Campaign
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Send newsletters and updates to supporters
            </p>
            <Button className="w-full bg-green-600 hover:bg-green-700">
              Create Campaign
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              Auto Responses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Set up automated replies for common inquiries
            </p>
            <Button variant="outline" className="w-full">
              Configure
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-purple-600" />
              Contact Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Manage contact lists and communication preferences
            </p>
            <Button variant="outline" className="w-full">
              Manage Contacts
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
