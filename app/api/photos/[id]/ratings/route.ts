import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Rating } from "@/models/Rating";
import { getUserFromRequest } from "@/lib/session";

// POST /api/photos/[id]/ratings → add/update rating (user must be logged in)
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }   // 👈 params is a Promise
) {
  try {
    await connectDB();

    const { id } = await params;                    // 👈 MUST await
    console.log("📌 RATING PHOTO ID:", id);

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

    const { value } = await req.json();
    const ratingValue = parseInt(value, 10);

    if (!ratingValue || ratingValue < 1 || ratingValue > 5) {
      return NextResponse.json(
        { error: "Rating value must be between 1 and 5" },
        { status: 400 }
      );
    }

    await Rating.findOneAndUpdate(
      { photoId: id, userId: session.userId },
      { value: ratingValue },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json(
      { message: "Rating saved" },
      { status: 201 }
    );
  } catch (err) {
    console.error("Add rating error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
