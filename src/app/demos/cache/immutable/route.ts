import { hri } from "human-readable-ids";
import { type NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  return NextResponse.json(
    { data: hri.random() },
    {
      status: 200,
      headers: {
        "Cache-Control": "public, max-age=604800, immutable",
      },
    }
  );
}
