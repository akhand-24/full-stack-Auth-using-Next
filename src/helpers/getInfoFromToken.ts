import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getInfoFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || "";
        if (!token) {
            return null; // No token found
        }

        const decodedToken:any=jwt.verify(token, process.env.TOKEN_SECRET!)

        return decodedToken.userId
        
    } catch (error) {
        console.error("Error extracting token info:", error);
        return null;
        
    }
}