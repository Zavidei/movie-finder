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

export async function DELETE(req) {
    try {
      const token = req.headers.get("authorization")?.replace("Bearer ", "");
      const userData = verifyToken(token);
      if (!userData) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { "Content-Type": "application/json" }
        });
      }
  
      const { imdbID } = await req.json();
      if (!imdbID) {
        return new Response(JSON.stringify({ error: "imdbID обязателен" }), { status: 400 });
      }
  
      await dbConnect();
      const users = mongoose.connection.db.collection("accounts");
  
      const result = await users.updateOne(
        { email: userData.email },
        { $pull: { favorites: { imdbID } } }
      );
  
      if (result.modifiedCount === 0) {
        return new Response(JSON.stringify({ error: "Фильм не найден" }), { status: 404 });
      }
  
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
      console.error("Ошибка при удалении из избранного:", error);
      return new Response(JSON.stringify({ error: "Ошибка сервера" }), { status: 500 });
    }
  }
  