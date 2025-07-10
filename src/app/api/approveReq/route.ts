import { NextResponse } from 'next/server';
import connectDb from "../../database/conn";
import mongoose from 'mongoose';
import { updateCarRequestStatus } from "../../model/carRequest";

export async function POST(req: Request) {
    try {
        const { id } = await req.json();
        
        if (!id) {
            return NextResponse.json(
                { message: 'Missing request id' },
                { status: 400 }
            );
        }
        
        console.log('Approving request ID:', id);
        
        // Update the status using the helper function
        const updatedRequest = updateCarRequestStatus(id, 'Approved');
        
        if (!updatedRequest) {
            return NextResponse.json(
                { message: 'Request not found' },
                { status: 404 }
            );
        }
        
        console.log('Updated request:', updatedRequest);
        
        return NextResponse.json({ 
            success: true, 
            message: 'Request approved successfully',
            data: updatedRequest
        });
    } catch (error) {
        console.error('Error approving request:', error);
        return NextResponse.json(
            { message: 'Error approving request', error: String(error) },
            { status: 500 }
        );
    }
} 