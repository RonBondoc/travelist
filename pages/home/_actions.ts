import { Configuration, OpenAIApi } from "openai";

export async function fetchChatGptData(country: string) {
  const requestBody = {
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: `Things I wish I've know before going to ${country} in json array format with tip and decription`,
      },
    ],
  };

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("api-key", process.env.CHATGPT_KEY || "");
  const result = await fetch(`${process.env.CHATGPT_URL}`, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(requestBody),
  });

  const data = await result.json();

  return {
    body: data.choices[0].message.content,
  };
}

export async function fetchChatGptDataOpenAi(country: string) {
  const config = new Configuration({
    apiKey: process.env.CHATGPT_KEY,
  });
  const openapi = new OpenAIApi(config);

  const res = await openapi.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `Things I wish I've know before going to ${country} in json array format using tips as key`,
      },
    ],
  });

  // @ts-ignore
  console.log(
    JSON.stringify(res.data.choices[0].message?.content?.trim()).replace(
      /[\n\r]/gm,
      ""
    )
  );

  return {
    body: JSON.stringify(res.data.choices[0].message?.content?.trim()).replace(
      /[\n\r]/gm,
      ""
    ),
  };
}
