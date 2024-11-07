import { NextResponse, NextRequest } from "next/server";
import {hri} from "human-readable-ids"
export async function GET(request: NextRequest) {


  if(request.headers.get("if-none-match") ==="i-am-an-etag"){
      return new NextResponse(null, {
        status: 304
      });
  }

  return   NextResponse.json({ data: hri.random() }, { status: 200, 
  headers: {
    "ETag": "i-am-an-etag",
    "Cache-Control": "public, max-age=604800, no-cache"
  } })   

}
