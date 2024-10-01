"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const FormSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export function LoginFrom({ loginState }: { loginState: "login" | "signup" }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const router = useRouter();
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!data.username || !data.password) {
      toast({
        title: "Invalid input",
        description: "Username and password are required.",
        variant: "destructive",
      });
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:3000/auth/${loginState.toString()}`,
        data
      );
      if (response.status === 200 || response.status === 201) {
        if (loginState === "signup") {
          toast({
            title: "Signup success",
            description: "You have successfully signed up.",
          });
        } else {
          toast({
            title: "Login success",
            description: "You have successfully logged in.",
          });
        }
        router.push("/");
      }
    } catch (error: any) {
      if (loginState === "signup") {
        toast({
          title: "signup failed",
          description:
            error?.response?.data || "Please check your username and password.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Login failed",
          description: "Please check your username and password.",
          variant: "destructive",
        });
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 min-h-[300px]">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="login" {...field} className="text-black" />
              </FormControl>
              {loginState === "signup" && (
                <FormDescription>
                  This is your public display name.
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="password"
                  {...field}
                  className="text-black"
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between items-center flex-col gap-2">
          {loginState === "login" ? (
            <>
              <Button type="submit">login</Button>
              <p className="text-black wrap text-center w-full">
                if you don't have an account,{" "}
                <Link href="/signup" className="text-primary text-blue-500">
                  signup
                </Link>
              </p>
            </>
          ) : (
            <>
              <Button type="submit">Sign Up</Button>
              <p className="text-black wrap text-center w-full">
                if you have an account,{" "}
                <Link href="/login" className="text-primary text-blue-500">
                  login
                </Link>
              </p>
            </>
          )}
        </div>
      </form>
    </Form>
  );
}
