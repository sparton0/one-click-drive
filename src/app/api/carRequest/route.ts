import { NextResponse } from 'next/server';
import connectDb from "../../database/conn";
import mongoose from 'mongoose';
import CarRequestSchema from "../../model/carRequest";

export async function GET() {
    try {
        // Return the static car request data
        return NextResponse.json({ success: true, data: CarRequestSchema });
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
            // Find the index of the item to update
            const index = CarRequestSchema.findIndex((item: any) => item.id === id);
            
            if (index === -1) {
                return NextResponse.json(
                    { message: 'Car request not found' },
                    { status: 404 }
                );
            }
            
            // Update the item
            CarRequestSchema[index] = {
                ...CarRequestSchema[index],
                name: name || CarRequestSchema[index].name,
                phone: phone || CarRequestSchema[index].phone,
                car_model: car_model || CarRequestSchema[index].car_model,
                duration: duration || CarRequestSchema[index].duration,
                status: status || CarRequestSchema[index].status
            };
            
            return NextResponse.json({ 
                success: true, 
                message: 'Car request updated successfully',
                data: CarRequestSchema[index]
            });
        } 
        // Create a new item
        else {
            // Generate a new ID (max ID + 1)
            const newId = Math.max(...CarRequestSchema.map((item: any) => item.id)) + 1;
            
            const newRequest = {
                id: newId,
                name,
                phone,
                car_model,
                duration,
                status: status || 'Pending'
            };
            
            // Add to the array
            CarRequestSchema.push(newRequest);
            
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