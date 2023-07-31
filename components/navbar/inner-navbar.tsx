"use client";

import React from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export default function InnerNavbar({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const params = useParams();
    const pathname = usePathname();
    const routes = [
        {
            href: `/${params.storeId}/settings`,
            label: "Settings",
            active: pathname === `/${params.storeId}/settings`,
        },
    ];

    return (
        <nav className={cn("space-x-4", className)}>
            {routes.map((it, id) => (
                <Link
                    key={id}
                    href={it.href}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        it.active
                            ? "text-primary dark:text-white"
                            : "text-muted-foreground"
                    )}
                >
                    {it.label}
                </Link>
            ))}
        </nav>
    );
}
