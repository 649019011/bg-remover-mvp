/**
 * Cloudflare Worker for Background Removal
 * Integrates with remove.bg API
 */

export default {
  async fetch(request, env) {
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return handleCORS();
    }

    // Only accept POST requests
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      const formData = await request.formData();
      const imageFile = formData.get('image');

      // Validate input
      if (!imageFile) {
        return jsonResponse({ error: 'No image provided' }, 400);
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(imageFile.type)) {
        return jsonResponse({ error: 'Invalid file type. Only JPG, PNG, and WebP are allowed.' }, 400);
      }

      // Validate file size (10MB max)
      const maxSize = 10 * 1024 * 1024;
      if (imageFile.size > maxSize) {
        return jsonResponse({ error: 'File too large. Maximum size is 10MB.' }, 400);
      }

      // Call remove.bg API
      const removeBgResponse = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
          'X-Api-Key': env.REMOVEBG_API_KEY,
        },
        body: formData,
      });

      if (!removeBgResponse.ok) {
        const errorText = await removeBgResponse.text();
        console.error('Remove.bg API error:', errorText);
        return jsonResponse(
          { error: 'Failed to process image. Please try again.' },
          removeBgResponse.status
        );
      }

      // Get the processed image
      const resultImage = await removeBgResponse.arrayBuffer();

      // Return the processed image
      return new Response(resultImage, {
        headers: {
          'Content-Type': 'image/png',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    } catch (error) {
      console.error('Worker error:', error);
      return jsonResponse({ error: 'Internal server error' }, 500);
    }
  },
};

/**
 * Handle CORS preflight requests
 */
function handleCORS() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

/**
 * Create JSON response
 */
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
