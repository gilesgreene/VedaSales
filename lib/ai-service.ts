import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_STUDIO_KEY || "");

export async function generateAISummary(productName: string, data: any) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    Analyze the following ecommerce product data and generate a 3-4 sentence concise insight for a seller.
    Focus on opportunity, sentiment, and competition.
    
    Product: ${productName}
    Reddit Mentions: ${data.redditMentions}
    Etsy Listings: ${data.etsyListings}
    YouTube Videos: ${data.youtubeViews}
    Price Range: ${data.priceMin} - ${data.priceMax}
    
    Format: "This product is trending in [Category]. [Insights about social sentiment]. [Insights about market saturation]. Opportunity score: [High/Medium/Low]."
    Be concise and professional.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text || "AI analysis unavailable at the moment.";
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    return "Error generating AI summary. Please check your Google AI Studio key.";
  }
}
