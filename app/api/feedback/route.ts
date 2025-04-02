import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Feedback from '@/app/models/Feedback';

// GET endpoint to fetch feedback
export async function GET() {
  try {
    await connectDB();
    console.log('GET /api/feedback: Fetching feedback entries');
    
    // Get latest 6 feedback entries sorted by date
    const feedbacks = await Feedback.find({})
      .sort({ createdAt: -1 })
      .limit(6);
    
    console.log(`GET /api/feedback: Successfully retrieved ${feedbacks.length} entries`);
    return NextResponse.json({ success: true, data: feedbacks });
  } catch (error) {
    console.error('GET /api/feedback ERROR:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch feedback' },
      { status: 500 }
    );
  }
}

// POST endpoint to submit feedback
export async function POST(request: NextRequest) {
  console.log('POST /api/feedback: Received feedback submission request');
  
  try {
    // Parse request body
    const body = await request.json();
    console.log('POST /api/feedback: Request body parsed', { body });
    
    const { name, email, rating, comment } = body;
    
    // Validate required fields
    if (!name || !email || !rating || !comment) {
      console.log('POST /api/feedback: Missing required fields', { name, email, rating, comment });
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Connect to database with retry logic
    let retries = 3;
    let connected = false;
    
    while (retries > 0 && !connected) {
      try {
        await connectDB();
        connected = true;
        console.log('POST /api/feedback: Connected to database successfully');
      } catch (connError) {
        console.error(`POST /api/feedback: Connection attempt failed (${retries} retries left)`, connError);
        retries--;
        if (retries === 0) {
          throw new Error('Failed to connect to database after multiple attempts');
        }
        // Wait 1 second before retrying
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    // Create new feedback document
    const newFeedback = await Feedback.create({
      name,
      email,
      rating: Number(rating), // Ensure rating is a number
      comment
    });
    
    console.log('POST /api/feedback: Feedback created successfully', { id: newFeedback._id });
    
    return NextResponse.json(
      { success: true, data: newFeedback },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('POST /api/feedback ERROR:', error);
    
    // Check for validation errors from Mongoose
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { success: false, message: 'Validation error', errors: validationErrors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to submit feedback' },
      { status: 500 }
    );
  }
} 