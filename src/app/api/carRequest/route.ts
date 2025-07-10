import { NextResponse } from 'next/server';
import connectDb from "../../database/conn";
import mongoose from 'mongoose';
import { getCarRequests, addCarRequest, updateCarRequestStatus } from "../../model/carRequest";

export async function GET() {
    try {
        // Return the car requests data
        return NextResponse.json({ success: true, data: getCarRequests() });
    } catch (error) {
        console.error('Error fetching car requests:', error);
        return NextResponse.json(
            { message: 'Error fetching car requests' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { id, name, phone, car_model, duration, status } = body;
        
        // Since we're using a static array, we need to find and update the item manually
        if (id) {
            // Update existing request
            const updatedRequest = updateCarRequestStatus(id, status);
            
            if (!updatedRequest) {
                return NextResponse.json(
                    { message: 'Car request not found' },
                    { status: 404 }
                );
            }
            
            return NextResponse.json({ 
                success: true, 
                message: 'Car request updated successfully',
                data: updatedRequest
            });
        } 
        // Create a new item
        else {
            const newRequest = addCarRequest({
                name,
                phone,
                car_model,
                duration,
                status: status || 'Pending'
            });
            
            return NextResponse.json({ 
                success: true, 
                message: 'Car request created successfully',
                data: newRequest
            });
        }
    } catch (error) {
        console.error('Error updating car request:', error);
        return NextResponse.json(
            { message: 'Error updating car request', error: (error as Error).message },
            { status: 500 }
        );
    }
} 