// app/api/users/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbconnect';
import User from '@/models/User';

export async function GET() {
   await dbConnect();
   try {
      const users = await User.find()
      return NextResponse.json({ success: true, data: users });
   } catch (error) {
      return NextResponse.json({ success: false }, { status: 400 });
   }
}