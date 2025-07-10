import { NextResponse } from 'next/server';
import connectDb from "../../database/conn";
import Users from "../../model/userModel";
import mongoose from 'mongoose';

export async function GET() {
    try {
        // Connect to DB for future use
        await connectDb();
        console.log('MongoDB connection state:', mongoose.connection.readyState);
        
        // Return the static users data
        return NextResponse.json({ success: true, data: Users });
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json(
            { message: 'Error fetching users' },
            { status: 500 }
        );
    }
} 