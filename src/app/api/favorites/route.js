import dbConnect from "@/app/lib/dbConnect";
import mongoose from "mongoose";
import { verifyToken } from "@/app/lib/auth";

export async function POST(req) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    const userData = verifyToken(token);
    if (!userData) return new Response("Unauthorized", { status: 401 });

    const body = await req.json();
    const { imdbID, Title, Poster } = body;

    await dbConnect();
    const users = mongoose.connection.db.collection("accounts");

    await users.updateOne(
      { email: userData.email },
      { $addToSet: { favorites: { imdbID, Title, Poster } } } 
    );

    return new Response("Added to favorites", { status: 200 });
  } catch (err) {
    return new Response("Error", { status: 500 });
  }
}

export async function GET(req) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    const userData = verifyToken(token);
    if (!userData) return new Response("Unauthorized", { status: 401 });

    await dbConnect();
    const users = mongoose.connection.db.collection("accounts");
    const user = await users.findOne({ email: userData.email });

    return Response.json(user.favorites || []);
  } catch (err) {
    return new Response("Error", { status: 500 });
  }
}
