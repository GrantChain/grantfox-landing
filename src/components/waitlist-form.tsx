"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { http } from "@/lib/axios";

const waitlistSchema = z.object({
  full_name: z.string().min(2, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(7, { message: "Invalid phone number" }),
});

type WaitlistFormValues = z.infer<typeof waitlistSchema>;

export default function WaitlistForm() {
  const form = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistSchema),
  });

  const onSubmit = async (data: WaitlistFormValues) => {
    try {
      const response = await http.post("/waitlist", data);

      if (response.status !== 200) {
        throw new Error(response.data.error || "Registration failed");
      }
      toast.success("You have joined the waitlist!");
      form.reset();
    } catch (err) {
      let message = "Registration failed";
      if (err instanceof Error) {
        message = err.message;
      }
      toast.error(message);
    }
  };

  return (
    <section className="w-full flex flex-col items-center justify-center py-12 bg-neutral-950 border-t border-neutral-800">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 text-center">
        Join the Waitlist
      </h2>
      <p className="text-gray-300 mb-6 text-center max-w-xl">
        Get early access and exclusive updates about GrantFox. Be among the
        first to try the platform!
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full max-w-md"
        >
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <input
                    type="text"
                    placeholder="Your full name"
                    {...field}
                    className="px-4 py-2 rounded border border-neutral-700 bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-neutral-400 w-full"
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <input
                    type="email"
                    placeholder="Your email"
                    {...field}
                    className="px-4 py-2 rounded border border-neutral-700 bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-neutral-400 w-full"
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <input
                    type="tel"
                    placeholder="Your phone number"
                    {...field}
                    className="px-4 py-2 rounded border border-neutral-700 bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-neutral-400 w-full"
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button
            type="submit"
            className="bg-orange-700 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded mt-2 disabled:opacity-50 transition-colors cursor-pointer"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting
              ? "Submitting..."
              : "Join the waitlist"}
          </button>
        </form>
      </Form>
      <Toaster position="top-center" richColors />
    </section>
  );
}
