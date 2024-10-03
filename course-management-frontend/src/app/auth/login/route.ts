"use server";

import axios from "axios";
import { NextRequest } from "next/server";

const backendUrl = process.env.API_URL || "http://backend:5000";
export async function POST(req: NextRequest) {
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

    const finalResponse = new Response(token ? token.join(", ") : "", {
      status: response.status,
      statusText: response.statusText,
      headers: {
        "set-cookie": token ? token.join(", ") : "",
      },
    });
    // add token to local storage
    return finalResponse;
  } catch (error) {
    const response = new Response(error?.response?.data || { error }, {
      status: 400,
      statusText: error.response.statusText,
    });
    return response;
  }
}
