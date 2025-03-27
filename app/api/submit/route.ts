import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const API_KEY = process.env.GEMINI_AI_API_KEY|| "";

export async function POST(req: Request) {
  try {
    const { description } = await req.json();

    if (!description) {
      return NextResponse.json({ error: 'Description is required.' }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model:  'gemini-1.5-pro' });

    const prompt = `give me 5 instagram caption for image url : ${ description} make it short and simple and also add some hasahtags`;

    const results = await model.generateContent(prompt); 
    // Extracting the response safely
    const response = results.response;
    if (!response) {
      throw new Error('No response received from the model.');
    }

    // const generatedText = response.text(); // This might not work, use the next line if needed
     const generatedText = response.candidates?.[0]?.content?.parts?.[0]?.text;

    return NextResponse.json({ tweet: generatedText });
  } catch (error) {
    console.error('Error generating tweet:', error);
    return NextResponse.json({ error: 'Failed to generate tweet' }, { status: 500 });

  }
}