import {connect} from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { get } from "http";
import { getInfoFromToken } from "@/helpers/getInfoFromToken";
import { send } from "process";
import { sendEmail } from "@/helpers/mailer";
connect();

export async function POST(request: NextRequest){
    try {
        
        const reqBody = await request.json();
        const {email} = reqBody;
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error:"User not found"}, {status:404});
        }
        sendEmail({
            email: user.email,
            emailType: "RESET",
            userId: user._id})
            
        return NextResponse.json({message:"Email sent successfully"}, {status:200});
        }
        catch (error) {
        console.log("Something went wrong!!");}

    }