import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";
import { isValidMongoDBObjectId } from "@/lib/mongo-helpers";
import Navbar from "@/components/navbar/navbar";

export default async function DashboardLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { storeId: string };
}) {
    const { userId } = auth();
    if (!userId) {
        redirect("/sign-in");
    }

    if (!isValidMongoDBObjectId(params.storeId)) {
        redirect(`/`);
    }

    const firstStoreWithId = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId,
        },
    });

    if (!firstStoreWithId) {
        redirect(`/`);
    }

    return (
        <>
            <Navbar />
            <div className="p-8 pt-6 space-y-4">{children}</div>
        </>
    );
}
