// Serverless function to proxy requests to OpenAI API
export default async function handler(req, res) {
  // Parse request body if it's a string
  if (typeof req.body === 'string') {
    try {
      req.body = JSON.parse(req.body);
    } catch (error) {
      return res.status(400).json({ error: 'Invalid JSON body' });
    }
  }

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Forward the request to OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization
      },
      body: JSON.stringify(req.body || {})
    });

    // Check if response is ok
    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      return res.status(response.status).json({ 
        error: { 
          message: `OpenAI API error: ${response.status} ${response.statusText}` 
        } 
      });
    }

    // Try to parse the response as JSON
    let data;
    try {
      data = await response.json();
    } catch (error) {
      const rawText = await response.text();
      console.error('Failed to parse OpenAI response as JSON:', rawText);
      return res.status(500).json({ 
        error: { 
          message: 'Failed to parse OpenAI response as JSON' 
        } 
      });
    }

    // Return the response
    return res.status(response.status).json(data);
  } catch (error) {
    console.error('Error proxying request to OpenAI:', error);
    return res.status(500).json({ 
      error: { 
        message: `Failed to proxy request to OpenAI: ${error.message}` 
      } 
    });
  }
}