"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.fullName.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!formData.message.trim()) {
      toast.error("Please enter a message");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      toast.success(data.message || "Message sent!");

      // Reset form after 5 seconds
      setTimeout(() => {
        setStatus("idle");
        setFormData({
          fullName: "",
          email: "",
          message: "",
        });
      }, 5000);
    } catch (error) {
      setStatus("error");
      toast.error(error instanceof Error ? error.message : "Something went wrong");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-6 text-center" id="contact">
        <CheckCircle className="w-10 h-10 text-green-500 mb-3" />
        <h3 className="font-heading font-bold text-lg text-brand-dark">
          Message sent!
        </h3>
        <p className="text-brand-gray text-sm mt-1">
          We&apos;ll be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 max-w-2xl mx-auto" id="contact">
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <Input
          type="text"
          placeholder="Your name"
          value={formData.fullName}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, fullName: e.target.value }))
          }
          className="bg-gray-50 border-gray-200 text-brand-dark placeholder:text-brand-gray-light rounded-xl h-12 focus:border-brand-blue focus:ring-brand-blue/20"
          required
        />
        <Input
          type="email"
          placeholder="Your email"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          className="bg-gray-50 border-gray-200 text-brand-dark placeholder:text-brand-gray-light rounded-xl h-12 focus:border-brand-blue focus:ring-brand-blue/20"
          required
        />
      </div>
      <Textarea
        placeholder="Your message..."
        value={formData.message}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, message: e.target.value }))
        }
        className="bg-gray-50 border-gray-200 text-brand-dark placeholder:text-brand-gray-light rounded-xl min-h-[120px] mb-4 focus:border-brand-blue focus:ring-brand-blue/20"
        required
      />
      <div className="flex justify-center">
        <Button
          type="submit"
          disabled={status === "loading"}
          className="bg-brand-blue text-white hover:bg-brand-blue-deep rounded-full px-10 py-4 h-auto font-heading font-bold text-base"
        >
          {status === "loading" ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            "Send Message"
          )}
        </Button>
      </div>
    </form>
  );
}
