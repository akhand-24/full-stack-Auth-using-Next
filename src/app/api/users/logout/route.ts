import { NextResponse } from "next/server";


export async function GET() {
    try {
        const response= NextResponse.json({ message: "Logout successful" }, { status: 200 });
        // Clear cookies or session data if necessary   
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0), // Set to a past date to delete the cookie
             // Set to a past date to delete the cookie
        });

        return response;
    } catch (error: any) {
        console.error("Error during logout:", error);
        return NextResponse.json({ error: "Failed to log out" }, { status: 500 });
        
    }
}