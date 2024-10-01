// create login endpoint By fetching backend API
"use server";

import { NextApiRequest } from "next/types";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const backendUrl = process.env.API_URL || "http://localhost:5000";
export async function POST(req: NextRequest ) {
  try {
    const body = await req.json();
    const username = body.username;
    const password = body.password;
    if (!username || !password) {
      return new Response("Username and password are required", {
        status: 400,
      });
    }
    const response = await axios.post(`${backendUrl}/auth/login`, {
      username,
      password,
    });
    // get cookie from response
    const token = response.headers["set-cookie"];
    const finalResponse = new Response(response.data, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        "set-cookie": token ? token.join(", ") : "",
      },
    });

    return finalResponse;
  } catch (error: any) {
    const response = new Response(error.response.data, {
      status: 400,
      statusText: error.response.statusText,
    });
    return response;
  }
}
