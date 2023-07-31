import React from "react";
import { Separator } from "@/components/ui/separator";

interface PageHeaderProps {
    title: string;
    description: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
    return (
        <div>
            <h2>{title}</h2>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
            <Separator className="my-3" />
        </div>
    );
}
