import prismadb from "@/lib/prismadb";

interface DashboardPageProps {
    params: { storeId: string };
}

export default async function DashboardPage({ params }: DashboardPageProps) {
    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
        },
    });
    return (
        <div className="flex">
            <div>dashboard: {store?.name}</div>
            <footer className="fixed bottom-0 overflow-hidden ">Test</footer>
        </div>
    );
}
