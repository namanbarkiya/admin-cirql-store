import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import React from "react";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { userId } = auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const firstStoreWithUser = await prismadb.store.findFirst({
        where: {
            userId,
        },
    });

    if (firstStoreWithUser?.id) {
        redirect(`/${firstStoreWithUser.id}`);
    }

    return <>{children}</>;
}
