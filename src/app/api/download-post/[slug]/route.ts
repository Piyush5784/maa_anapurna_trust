import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const backupDir = path.join(process.cwd(), "backups");
    const filePath = path.join(backupDir, `${slug}.md`);

    // Check if backup file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: "Post backup not found" },
        { status: 404 }
      );
    }

    // Read the markdown file
    const content = fs.readFileSync(filePath, "utf-8");

    // Return the file as download
    return new NextResponse(content, {
      status: 200,
      headers: {
        "Content-Type": "text/markdown",
        "Content-Disposition": `attachment; filename="${slug}.md"`,
      },
    });
  } catch (error) {
    console.error("Error downloading post:", error);
    return NextResponse.json(
      { error: "Failed to download post" },
      { status: 500 }
    );
  }
}
