"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackPageView } from "@/lib/actions/analytics";

// Generate a session ID that persists for the browser session
const getSessionId = () => {
  if (typeof window === "undefined") return null;

  let sessionId = sessionStorage.getItem("analytics-session");
  if (!sessionId) {
    sessionId =
      Math.random().toString(36).substring(2) + Date.now().toString(36);
    sessionStorage.setItem("analytics-session", sessionId);
  }
  return sessionId;
};

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const startTimeRef = useRef<number>(0);
  const previousPathnameRef = useRef<string>("");

  useEffect(() => {
    // Track when user enters a page
    const handlePageView = async () => {
      const sessionId = getSessionId();
      if (!sessionId) return;

      // Calculate duration on previous page
      if (startTimeRef.current && previousPathnameRef.current) {
        const duration = Math.round((Date.now() - startTimeRef.current) / 1000);

        // Send duration for previous page if it was more than 5 seconds
        if (duration > 5) {
          try {
            await trackPageView({
              page: previousPathnameRef.current,
              title: document.title,
              sessionId,
              duration,
            });
          } catch (error) {
            console.error("Analytics tracking error:", error);
          }
        }
      }

      // Track current page view
      startTimeRef.current = Date.now();
      previousPathnameRef.current = pathname;

      try {
        await trackPageView({
          page: pathname,
          title: document.title,
          sessionId,
        });
      } catch (error) {
        console.error("Analytics tracking error:", error);
      }
    };

    // Small delay to ensure page is loaded and title is set
    const timer = setTimeout(handlePageView, 500);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Track when user leaves the page/site
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (startTimeRef.current && previousPathnameRef.current) {
        const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
        const sessionId = getSessionId();

        if (duration > 5 && sessionId) {
          // Use sendBeacon for reliable tracking on page unload
          const data = JSON.stringify({
            page: previousPathnameRef.current,
            title: document.title,
            sessionId,
            duration,
          });

          // Since server actions don't work with sendBeacon, use API route as fallback
          navigator.sendBeacon("/api/analytics/track", data);
        }
      }
    };

    const handleVisibilityChange = async () => {
      if (
        document.visibilityState === "hidden" &&
        startTimeRef.current &&
        previousPathnameRef.current
      ) {
        const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
        const sessionId = getSessionId();

        if (duration > 5 && sessionId) {
          try {
            await trackPageView({
              page: previousPathnameRef.current,
              title: document.title,
              sessionId,
              duration,
            });
          } catch (error) {
            console.error("Analytics tracking error:", error);
          }
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // This component renders nothing - it's just for tracking
  return null;
}
