import { Logtype } from "@/generated/prisma";
import {
  AlertCircle,
  Info,
  AlertTriangle,
  CheckCircle,
  Bug,
  RefreshCw,
  Search,
  Filter,
  Plus,
} from "lucide-react";

export function getLogIcon(level: Logtype) {
  switch (level) {
    case "ERROR":
      return <AlertCircle className="h-5 w-5 text-red-500" />;
    case "WARN":
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    case "INFO":
      return <Info className="h-5 w-5 text-blue-500" />;
    case "SUCCESS":
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case "DEBUG":
      return <Bug className="h-5 w-5 text-gray-500" />;
    default:
      return <Info className="h-5 w-5 text-gray-500" />;
  }
}

export function getLogVariant(
  level: Logtype
): "default" | "secondary" | "destructive" | "outline" {
  switch (level) {
    case "ERROR":
      return "destructive";
    case "WARN":
      return "outline";
    case "SUCCESS":
      return "default";
    case "INFO":
      return "secondary";
    case "DEBUG":
      return "outline";
    default:
      return "secondary";
  }
}

export function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
}
