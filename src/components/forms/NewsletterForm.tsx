"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      toast.success(data.message || "You're subscribed!");
    } catch (error) {
      setStatus("error");
      toast.error(error instanceof Error ? error.message : "Something went wrong");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-2 text-green-400">
        <CheckCircle className="w-5 h-5" />
        <span className="font-medium">You&apos;re subscribed!</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 w-full sm:w-auto">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl h-12 px-4 w-full sm:w-72 text-base focus:border-white"
        required
      />
      <Button
        type="submit"
        disabled={status === "loading"}
        className="bg-white hover:bg-gray-100 text-brand-blue rounded-xl px-8 h-12 font-bold text-base whitespace-nowrap"
      >
        {status === "loading" ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          "Subscribe"
        )}
      </Button>
    </form>
  );
}
