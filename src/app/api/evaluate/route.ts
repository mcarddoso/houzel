// src/app/api/evaluate/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Parse the incoming FormData.
  const formData = await request.formData();

  // Forward the FormData to the external evaluation service.
  const externalResponse = await fetch("http://127.0.0.1:5000/evaluate", {
    method: "POST",
    body: formData,
  });

  // You can process the external response as needed.
  const externalData = await externalResponse.json();

  // Return the external service's response.
  return NextResponse.json(externalData);
}
