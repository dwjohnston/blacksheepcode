import { NextResponse, NextRequest } from "next/server";



const db = {
  "1": {
    id: "1",
    description: "Todo1",
    projectGroupId: "1",

  },
  "2": {
    id: "2",
    description: "Todo2",
    projectGroupId: "1",

  },
    "3": {
    id: "3",
    description: "Todo3",
    projectGroupId: "1",

  },
    "4": {
    id: "4",
    description: "Todo4",
    projectGroupId: "2",

  },
    "5": {
    id: "5",
    description: "Todo5",
    projectGroupId: "2",

  },
}

export async function GET(request: NextRequest) {


  const todos =  Object.values(db);

  return   NextResponse.json((todos), { status: 200, 
  headers: {
    "Cache-Control": "private, max-age=300"
  } })   

}
