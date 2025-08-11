import { NextRequest, NextResponse } from "next/server";
import {
  withRateLimit,
  strictApiRateLimiter,
  uploadRateLimiter,
} from "@/lib/rate-limit";
import { requireAdmin } from "@/lib/auth";
import { getAllStories } from "@/lib/actions/story";

async function getHandler(req: NextRequest) {
  try {
    // Get stories (public endpoint, less strict rate limiting)
    const url = new URL(req.url);
    const status = url.searchParams.get("status") as any;

    const result = await getAllStories(status);

    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 400 });
    }

    return NextResponse.json(result.data);
  } catch (error: any) {
    console.error("API GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function postHandler(req: NextRequest) {
  try {
    // Create story (admin only, strict rate limiting)
    await requireAdmin();

    // Handle story creation logic here
    // This would be similar to the server action but as an API endpoint

    return NextResponse.json(
      { message: "Story created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.message === "Authentication required") {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    if (error.message === "Admin access required") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    console.error("API POST error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Export with different rate limiting for different methods
export const GET = withRateLimit(getHandler); // Standard API rate limiting
export const POST = withRateLimit(postHandler, uploadRateLimiter); // Stricter for uploads/creation
