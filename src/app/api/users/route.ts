import { NextResponse } from 'next/server';
import { getUsers } from "../../model/userModel";

export async function GET() {
    try {
        const users = getUsers();
        
        return NextResponse.json({ 
            success: true, 
            data: users,
            count: users.length
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json(
            { 
                success: false,
                message: 'Error fetching users',
                error: String(error)
            },
            { status: 500 }
        );
    }
} 