"use client";

import { z } from "zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Store } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

interface SettingsFormProps {
    initialData: Store;
}

const formSchema = z.object({
    name: z.string().min(1),
});

type SettingsFormValues = z.infer<typeof formSchema>;

export default function SettingsForm({ initialData }: SettingsFormProps) {
    const [loading, setLoading] = useState(false);
    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });

    const onSubmit = (data: SettingsFormValues) => {
        // setLoading(true);
        console.log(data);
    };

    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-8"
                >
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="store name..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="ml-auto"
                    >
                        Save Changes
                    </Button>
                </form>
            </Form>
        </div>
    );
}
