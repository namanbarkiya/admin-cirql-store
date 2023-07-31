"use client";

import React, { useState } from "react";
import { Store } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import {
    Check,
    ChevronsUpDown,
    PlusCircle,
    Store as StoreIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useModalStore } from "@/hooks/use-modal-store";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
    typeof PopoverTrigger
>;

interface StoreSwitcherProps extends PopoverTriggerProps {
    items: Store[];
}

export default function StoreSwitcher({
    className,
    items = [],
}: StoreSwitcherProps) {
    const params = useParams();
    const router = useRouter();
    const storeModal = useModalStore();

    const [open, setOpen] = useState(false);

    const formattedStore = items.map((item) => ({
        label: item.name,
        value: item.id,
    }));

    const currentStore = formattedStore.find(
        (item) => item.value === params.storeId
    );

    const onStoreChange = (store: { label: string; value: string }) => {
        setOpen(false);
        router.push(`/${store.value}`);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn("w-[200px] justify-between", className)}
                >
                    <StoreIcon className="mr-2 h-5 w-5" />
                    {currentStore?.label}
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search Stores..." />
                        <CommandEmpty>No stores found</CommandEmpty>
                        <CommandGroup heading="stores">
                            {formattedStore.map((item) => (
                                <CommandItem
                                    key={item.value}
                                    onSelect={() => onStoreChange(item)}
                                >
                                    <StoreIcon className="mr-2 h-5 w-5" />
                                    {item.label}
                                    <Check
                                        className={cn(
                                            "ml-2 h-4 w-4",
                                            currentStore?.value === item.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                                onSelect={() => {
                                    setOpen(false);
                                    storeModal.onOpen();
                                }}
                            >
                                <PlusCircle className="mr-2 h-5 w-5" />
                                create store
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
