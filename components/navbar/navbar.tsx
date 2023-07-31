import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import InnerNavbar from "@/components/navbar/inner-navbar";
import StoreSwitcher from "@/components/store-switcher";
import prismadb from "@/lib/prismadb";

export default async function Navbar() {
    const { userId } = auth();
    if (!userId) {
        redirect("/sign-in");
    }

    const stores = await prismadb.store.findMany({
        where: {
            userId,
        },
    });
    return (
        <div className="h-16 border-b flex items-center px-4">
            <StoreSwitcher items={stores} />
            <InnerNavbar className="mx-6" />
            <div className="ml-auto space-x-4 flex items-center">
                <UserButton />
            </div>
        </div>
    );
}
