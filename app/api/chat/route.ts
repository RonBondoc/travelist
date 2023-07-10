import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

function replacer(key: string, value: string) {
  return value.trim();
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get("country");

  const requestBody = {
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "" },
      {
        role: "user",
        content: `top 5 Things I wish I've know before going to ${country} that is easy to digest`,
      },
    ],
  };

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("api-key", process.env.CHATGPT_KEY || "");
  requestHeaders.set("Content-Type", "application/json");
  const result = await fetch(`${process.env.CHATGPT_URL}`, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(requestBody),
  });

  const data = await result.json();
  const chatGptResponse = data.choices[0].message.content
    .replace(/\n/gm, " ")
    .replace(/(\d.)/gm, "-")
    .split("-");

  console.log("response", data.choices[0].message.content);

  return NextResponse.json({
    body: chatGptResponse.splice(1),
  });

  return {
    body: "sample",
  };
}
