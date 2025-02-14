"use client";

// ========================================================================================================

import { createUser } from "../actions/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInputField } from "@/components/FormFields/FormInputField";
import { useState } from "react";
import toast from "react-hot-toast";
import { createUserSchema } from "../actions/user.schema";

// ========================================================================================================

export function HomeForm() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof createUserSchema>) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);

    const { message, success } = await createUser(formData);
    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <div className="flex gap-x-2 text-black">
          <FormInputField name="name" title="Nom" form={form} />
          <FormInputField name="email" title="Email" form={form} />
        </div>
        <Button isLoading={isLoading} type="submit" className="w-fit">
          Submit
        </Button>
      </form>
    </Form>
  );
}

// ========================================================================================================
