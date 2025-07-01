import { NextResponse, NextRequest } from "next/server";
import {hri} from "human-readable-ids"
import { group } from "console";


const db = {
  "1": {
    id: "1",
    name: "Group 1",
    description: "This is group 1"
  },
  "2": {
    id: "2",
    name: "Group 2",
    description: "This is group 2"
  },
}

export async function GET(request: NextRequest,
    { params }: { params: Promise<{ groupId: string }> }

) {


  const {groupId}  = await params; 
  const groupData = groupId ? db[groupId as keyof typeof db] : null;

  if(!groupData) {
    return NextResponse.json({ error: "Group not found" }, { status: 404 });
  }



  return   NextResponse.json((groupData), { status: 200, 
  headers: {
    "Cache-Control": "private, max-age=300"
  } })   

}
