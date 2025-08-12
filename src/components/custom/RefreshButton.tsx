"use client";

import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useState, useTransition } from "react";
import { refreshFinanceData, forceRefreshFinancePage } from "@/lib/actions/finance";

interface RefreshButtonProps {
  showBothOptions?: boolean;
}

export function RefreshButton({ showBothOptions = false }: RefreshButtonProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDataRefreshing, setIsDataRefreshing] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handlePageRefresh = () => {
    setIsRefreshing(true);
    startTransition(async () => {
      try {
        const result = await forceRefreshFinancePage();
        if (result.success) {
          console.log("Page refreshed successfully");
        } else {
          console.error("Failed to refresh page:", result.error);
        }
      } catch (error) {
        console.error("Error refreshing page:", error);
      } finally {
        setIsRefreshing(false);
      }
    });
  };

  const handleDataRefresh = () => {
    setIsDataRefreshing(true);
    startTransition(async () => {
      try {
        const result = await refreshFinanceData(7, 50);
        if (result.success) {
          console.log("Finance data refreshed successfully");
        } else {
          console.error("Failed to refresh data:", result.error);
        }
      } catch (error) {
        console.error("Error refreshing data:", error);
      } finally {
        setIsDataRefreshing(false);
      }
    });
  };

  if (showBothOptions) {
    return (
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          onClick={handlePageRefresh}
          disabled={isRefreshing || isDataRefreshing || isPending}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh Page'}
        </Button>
        <Button 
          variant="outline" 
          onClick={handleDataRefresh}
          disabled={isRefreshing || isDataRefreshing || isPending}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isDataRefreshing ? 'animate-spin' : ''}`} />
          {isDataRefreshing ? 'Fetching...' : 'Refresh Data'}
        </Button>
      </div>
    );
  }

  return (
    <Button 
      variant="outline" 
      onClick={handlePageRefresh}
      disabled={isRefreshing || isPending}
    >
      <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
      {isRefreshing ? 'Refreshing...' : 'Refresh'}
    </Button>
  );
}
