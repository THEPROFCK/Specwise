// app/api/recommendations/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { formData } = body;

    // Validate that we have the necessary data
    if (!formData || !formData.deviceType) {
      return NextResponse.json(
        { error: 'Missing required form data' },
        { status: 400 }
      );
    }

    // Construct the prompt for the AI
    const prompt = `You are an expert tech consultant. Based on the following user preferences, recommend 3 specific devices with detailed explanations.

User Preferences:
- Device Type: ${formData.deviceType}
- Budget: $${formData.budget}
- Use Cases: ${formData.useCases.join(", ")}
- Preferred Brands: ${formData.brands.length > 0 ? formData.brands.join(", ") : "No preference"}
- Screen Size: ${formData.screenSize}
- OS Preference: ${formData.osPreference || "No preference"}
- Important Connectivity: ${formData.connectivity.join(", ") || "None specified"}
- Must-have Features: ${formData.specialFeatures.join(", ") || "None specified"}
- Upgrade Frequency: ${formData.upgradeFrequency || "Not specified"}

Priority Ratings (1-10):
- Battery Life: ${formData.priorities.battery}
- Camera Quality: ${formData.priorities.camera}
- Performance: ${formData.priorities.performance}
- Storage: ${formData.priorities.storage}
- Display Quality: ${formData.priorities.display}
- Durability: ${formData.priorities.durability}

Other Factors (1-10):
- Price-to-Value: ${formData.importanceFactors.priceValue}
- Brand Reputation: ${formData.importanceFactors.brandReputation}
- Future-Proofing: ${formData.importanceFactors.futureProofing}
- Eco-Friendliness: ${formData.importanceFactors.ecoFriendly}

Please provide 3 device recommendations in the following JSON format:
{
  "recommendations": [
    {
      "rank": 1,
      "name": "Device Name",
      "brand": "Brand",
      "price": "Price",
      "matchScore": 95,
      "pros": ["Pro 1", "Pro 2", "Pro 3"],
      "cons": ["Con 1", "Con 2"],
      "bestFor": "Brief description of who this is best for",
      "keySpecs": {
        "processor": "Spec",
        "ram": "Spec",
        "storage": "Spec",
        "display": "Spec",
        "battery": "Spec"
      },
      "whyRecommended": "Detailed explanation of why this device matches their needs"
    }
  ],
  "summary": "Overall recommendation summary and advice"
}`;

    // Call OpenRouter API
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        "X-Title": "Device Recommender"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenRouter API Error:", errorData);
      return NextResponse.json(
        { error: `OpenRouter API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Parse the JSON response
    let parsedContent;
    try {
      parsedContent = JSON.parse(content);
    } catch (e) {
      // Try to extract JSON from the response if it's wrapped in markdown
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedContent = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Could not parse JSON response from AI");
      }
    }
    
    return NextResponse.json(parsedContent);

  } catch (error) {
    console.error("Error in recommendations API:", error);
    const message =
      error instanceof Error ? error.message : typeof error === "string" ? error : String(error);
    return NextResponse.json(
      { error: 'Failed to generate recommendations', details: message },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to check API health
export async function GET() {
  return NextResponse.json({ 
    status: 'ok',
    message: 'Recommendations API is running',
    hasApiKey: !!process.env.OPENROUTER_API_KEY
  });
}