// pages/api/chat.js

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Set up the request body and headers
  const {email, ...requestBody} =  await request.json();
  const useTokenBody = JSON.stringify({email: email});
  const strRequestBody = JSON.stringify(requestBody);

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.FALCON_API_KEY}`
  };

  try {
    const useTokenResponse = await fetch(`${process.env.NEXTAUTH_URL}/api/user/useToken`, {
      mode: "no-cors",
      method: 'POST',
      body: useTokenBody
    });
    if(useTokenResponse.status == 200)
    {
      // Make the POST request using fetch
      const response = await fetch('https://api.ai71.ai/v1/chat/completions', {
        mode: "no-cors",
        method: 'POST',
        headers: headers,
        body: strRequestBody,
      });

      // Parse the response
      const data = await response.json();
      console.log(data);
      // Return the response from the external API
      return NextResponse.json({data});
    }
    else if(useTokenResponse.status == 403) return NextResponse.json({message: "Not enough tokens!"}, {status: 403});
    else return NextResponse.json({message: "Something went wrong"}, {status: useTokenResponse.status});


  } catch (error) {
    // Handle errors
    console.error('Error:', error);
    return NextResponse.json({message: "Internal server error"}, {status: 500});
  }
}
