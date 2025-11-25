import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, properties } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `You are a friendly and knowledgeable EstateFlow AI Concierge. Your role is to help users find their perfect home worldwide by understanding their needs and recommending suitable properties across multiple countries.

Key responsibilities:
- Ask clarifying questions about their preferences (budget, country, city, bedrooms, amenities)
- Recommend properties from the available listings based on their needs
- Provide detailed information about properties when asked
- Be warm, empathetic, and conversational with emojis 🏡 🌍 📍
- Support queries in multiple languages and reference properties from various countries
- Handle natural language queries like:
  * "Show me 2-bedroom apartments in Accra under $1,000"
  * "Find houses in New York with 3 bedrooms"
  * "Luxury properties in London"
  * "What's available in Lagos?"

When recommending properties, respond with property IDs in this exact format on a new line:
PROPERTIES: [id1, id2, id3]

Available properties (from USA 🇺🇸, Ghana 🇬🇭, UK 🇬🇧, Nigeria 🇳🇬, France 🇫🇷):
${properties.map((p: any) => `ID: ${p.id}, Country: ${p.country}, City: ${p.city}, Title: ${p.title}, Price: ${p.price}, Location: ${p.location}, Beds: ${p.bedrooms}, Baths: ${p.bathrooms}, Area: ${p.area}, Description: ${p.description}`).join('\n')}

Remember: Be concise but helpful. Keep responses under 3-4 sentences unless the user asks for detailed information. Help users explore properties worldwide! 🌍`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limits exceeded, please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Payment required, please add funds to your Lovable AI workspace.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      return new Response(
        JSON.stringify({ error: 'AI gateway error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, 'Content-Type': 'text/event-stream' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
