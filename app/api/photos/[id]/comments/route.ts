import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Comment } from "@/models/Comment";
import { getUserFromRequest } from "@/lib/session";

// POST /api/photos/[id]/comments → add a comment (user must be logged in)
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }   // 👈 params is a Promise
) {
  try {
    await connectDB();

    const { id } = await params;                    // 👈 MUST await
    console.log("📌 COMMENT PHOTO ID:", id);

    if (!id) {
      return NextResponse.json(
        { error: "Photo ID is required" },
        { status: 400 }
      );
    }

    const session = getUserFromRequest(req);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { text } = await req.json();
    if (!text || !text.trim()) {
      return NextResponse.json(
        { error: "Comment text is required" },
        { status: 400 }
      );
    }

    await Comment.create({
      photoId: id,
      userId: session.userId,
      text,
    });

    return NextResponse.json(
      { message: "Comment added" },
      { status: 201 }
    );
  } catch (err) {
    console.error("Add comment error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
