"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";

type AmountTier = "5" | "40" | "160" | "custom";
type Frequency = "one-off" | "monthly";
type FormStatus = "idle" | "loading" | "success" | "error";

const tiers: { value: AmountTier; label: string }[] = [
  { value: "5", label: "£5" },
  { value: "40", label: "£40" },
  { value: "160", label: "£160" },
  { value: "custom", label: "Custom" },
];

export default function DonateForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    amountTier: "" as AmountTier | "",
    customAmount: "",
    frequency: "one-off" as Frequency,
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
    if (!formData.amountTier) {
      toast.error("Please select an amount");
      return;
    }
    if (formData.amountTier === "custom" && (!formData.customAmount || parseFloat(formData.customAmount) <= 0)) {
      toast.error("Please enter a valid custom amount");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          amountTier: formData.amountTier,
          customAmount: formData.amountTier === "custom" ? parseFloat(formData.customAmount) : undefined,
          frequency: formData.frequency,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      toast.success(data.message || "Thank you for your pledge!");

      // Reset form after 5 seconds
      setTimeout(() => {
        setStatus("idle");
        setFormData({
          fullName: "",
          email: "",
          amountTier: "",
          customAmount: "",
          frequency: "one-off",
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
      <div className="flex flex-col items-center justify-center py-6 text-center">
        <CheckCircle className="w-10 h-10 text-green-500 mb-3" />
        <h3 className="font-heading font-bold text-lg text-brand-dark">
          Thank you for your pledge!
        </h3>
        <p className="text-brand-gray text-sm mt-1">
          We&apos;ll be in touch to arrange payment.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6 pt-6 border-t border-gray-100">
      <p className="text-sm text-brand-gray">
        Or pledge your support and we&apos;ll be in touch:
      </p>

      <div className="grid sm:grid-cols-2 gap-3">
        <Input
          type="text"
          placeholder="Your name"
          value={formData.fullName}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, fullName: e.target.value }))
          }
          className="rounded-xl border-gray-200 focus:border-brand-blue focus:ring-brand-blue/20"
          required
        />
        <Input
          type="email"
          placeholder="Your email"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          className="rounded-xl border-gray-200 focus:border-brand-blue focus:ring-brand-blue/20"
          required
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {tiers.map((tier) => (
          <button
            key={tier.value}
            type="button"
            onClick={() =>
              setFormData((prev) => ({ ...prev, amountTier: tier.value }))
            }
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
              formData.amountTier === tier.value
                ? "bg-brand-blue text-white"
                : "bg-gray-100 text-brand-dark hover:bg-gray-200"
            }`}
          >
            {tier.label}
          </button>
        ))}
      </div>

      {formData.amountTier === "custom" && (
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray font-medium">
            £
          </span>
          <Input
            type="number"
            placeholder="Enter amount"
            value={formData.customAmount}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, customAmount: e.target.value }))
            }
            className="pl-7 rounded-xl border-gray-200 focus:border-brand-blue focus:ring-brand-blue/20"
            min="1"
          />
        </div>
      )}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() =>
            setFormData((prev) => ({ ...prev, frequency: "one-off" }))
          }
          className={`flex-1 py-2 rounded-lg font-medium text-sm transition-all ${
            formData.frequency === "one-off"
              ? "bg-brand-dark text-white"
              : "bg-gray-100 text-brand-dark hover:bg-gray-200"
          }`}
        >
          One-off
        </button>
        <button
          type="button"
          onClick={() =>
            setFormData((prev) => ({ ...prev, frequency: "monthly" }))
          }
          className={`flex-1 py-2 rounded-lg font-medium text-sm transition-all ${
            formData.frequency === "monthly"
              ? "bg-brand-dark text-white"
              : "bg-gray-100 text-brand-dark hover:bg-gray-200"
          }`}
        >
          Monthly
        </button>
      </div>

      <Button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-brand-blue hover:bg-brand-blue-deep text-white rounded-xl py-3.5 font-bold"
      >
        {status === "loading" ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          "Pledge Your Support"
        )}
      </Button>

      <p className="text-xs text-brand-gray-light text-center">
        This records your interest. We&apos;ll contact you to arrange payment.
      </p>
    </form>
  );
}
