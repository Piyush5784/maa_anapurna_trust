"use client";

import { Button } from "@/components/ui/button";
import { Edit, Trash2, MoreHorizontal } from "lucide-react";

import { getUsers, getUserStats, deleteUser } from "@/lib/actions/users";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface UserActionsProps {
  userId: string;
}

export default function UserActions({ userId }: UserActionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this user?")) {
      return;
    }

    setIsLoading(true);
    try {
      const result = await deleteUser(userId);
      if (result.success) {
        router.refresh();
      } else {
        alert("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    // For now, just show an alert. You can implement a modal or navigate to edit page
    alert("Edit functionality coming soon!");
  };

  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        variant="outline"
        onClick={handleEdit}
        disabled={isLoading}
      >
        <Edit className="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={handleDelete}
        disabled={isLoading}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
