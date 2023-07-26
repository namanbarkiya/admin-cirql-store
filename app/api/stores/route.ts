import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const body = await req.json();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { name } = body;
        if (!name) {
            return new NextResponse("Name is required", { status: 404 });
        }

        const dbRes = await prismadb.store.create({
            data: {
                name,
                userId,
            },
        });

        return NextResponse.json(dbRes);
    } catch (err) {
        console.log(err);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
