import { NextResponse } from 'next/server';
import connectDb from "../../database/conn";
import mongoose from 'mongoose';
import CarRequestSchema from "../../model/carRequest";

export async function POST(req: Request) {
    try {
        await connectDb();
        const { id } = await req.json();
        
        if (!id) {
            return NextResponse.json(
                { message: 'Missing request id' },
                { status: 400 }
            );
        }
        
        console.log('Request ID:', id);
        
        const requestIndex = CarRequestSchema.findIndex(req => req.id === id);
        
        if (requestIndex === -1) {
            return NextResponse.json(
                { message: 'Request not found' },
                { status: 404 }
            );
        }
        
        // Update the status
        CarRequestSchema[requestIndex].status = 'Approved';
        
        console.log('Updated request:', CarRequestSchema[requestIndex]);
        
        return NextResponse.json({ 
            success: true, 
            message: 'Request approved successfully',
            data: CarRequestSchema[requestIndex]
        });
    } catch (error) {
        console.error('Error approving request:', error);
        return NextResponse.json(
            { message: 'Error approving request', error: String(error) },
            { status: 500 }
        );
    }
} 