"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import { useModalStore } from "@/hooks/use-modal-store";
import { Modal } from "@/components/ui/modal";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
    name: z.string().min(1),
});

export const StoreModal = () => {
    const modalStore = useModalStore();
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log("hello");
        try {
            setLoading(true);
            const res = await axios.post("/api/stores", values);
            toast({
                variant: "primary",
                title: "Store Created!",
                description: "The store was created successfully",
            });
        } catch (err: any) {
            toast({
                variant: "destructive",
                title: `"Uh oh! Something went wrong."`,
                description: `${err.message}`,
            });
        } finally {
            setLoading(false);
        }
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    return (
        <Modal
            title="Hello"
            description="hello"
            isOpen={modalStore.isOpen}
            onClose={modalStore.onClose}
        >
            <div>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Store Name"
                                                disabled={loading}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="pt-4 flex justify-end items-center gap-2">
                                <Button
                                    onClick={modalStore.onClose}
                                    disabled={loading}
                                >
                                    Cancel
                                </Button>
                                <Button disabled={loading} type="submit">
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    );
};
