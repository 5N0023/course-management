// create login endpoint By fetching backend API
"use server";

import { NextApiRequest } from "next/types";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest ) {
  try {
    // return a response that clears the cookie
    const finalResponse = new Response("Logged out", {
      status: 200,
      statusText: "OK",
      headers: {
        "set-cookie": "token=; Max-Age=0; Path=/",
      },
    });
    return finalResponse;
  }
  catch (error: any) {
    const response = new Response(error.response.data, {
      status: 400,
      statusText: error.response.statusText,
    });
    return response;
  }
}

