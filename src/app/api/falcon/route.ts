// pages/api/chat.js

export async function POST(request: Request) {
  // Set up the request body and headers
  const requestBody =  JSON.stringify(await request.json());

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.FALCON_API_KEY}`
  };

  try {
    // Make the POST request using fetch
    const response = await fetch('https://api.ai71.ai/v1/chat/completions', {
      method: 'POST',
      headers: headers,
      body: requestBody
    });

    // Parse the response
    const data = await response.json();

    // Return the response from the external API
    return Response.json({data});
  } catch (error) {
    // Handle errors
    console.error('Error:', error);
    //return res.status(500).json({ message: 'Internal server error' });
  }
}
