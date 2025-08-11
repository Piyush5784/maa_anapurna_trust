import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <FileQuestion className="w-16 h-16 text-gray-400 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Story Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The story you're looking for doesn't exist or has been removed.
        </p>
        <div className="space-x-4">
          <Link href="/Manage/stories">
            <Button>Back to Stories</Button>
          </Link>
          <Link href="/Manage/stories/create">
            <Button variant="outline">Create New Story</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
