import SettingsForm from "@/components/forms/settings-form";
import PageHeader from "@/components/ui/page-header";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

interface SettingsPageProps {
    params: {
        storeId: string;
    };
}

export default async function SettingsPage({ params }: SettingsPageProps) {
    const { userId } = auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId,
        },
    });

    if (!store) {
        redirect("/");
    }

    return (
        <div>
            <PageHeader
                title="Settings"
                description="update your preferences"
            />
            <SettingsForm initialData={store} />
        </div>
    );
}
