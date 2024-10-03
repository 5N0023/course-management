"use server";


export async function GET() {
  try {
    const finalResponse = new Response("Logged out", {
      status: 200,
      statusText: "OK",
      headers: {
        "set-cookie": "token=; Max-Age=0; Path=/",
      },
    });
    return finalResponse;
  } catch (error) {
    const response = new Response(error.response.data, {
      status: 400,
      statusText: error.response.statusText,
    });
    return response;
  }
}
