"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const volunteerRoles = [
  "Cooking & Prep",
  "Packing Meals",
  "Distribution",
  "Food Collection",
  "Admin & Coordination",
];

type FormStatus = "idle" | "loading" | "success" | "error";

export default function VolunteerForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    roles: [] as string[],
    availability: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleRoleChange = (role: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      roles: checked
        ? [...prev.roles, role]
        : prev.roles.filter((r) => r !== role),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.fullName.trim()) {
      toast.error("Please enter your full name");
      return;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (formData.roles.length === 0) {
      toast.error("Please select at least one role");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      toast.success(data.message || "Thank you for signing up!");

      // Reset form after 5 seconds
      setTimeout(() => {
        setStatus("idle");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          roles: [],
          availability: "",
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
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
        <h3 className="font-heading font-bold text-lg text-brand-dark">
          Thank you for signing up!
        </h3>
        <p className="text-brand-gray text-sm mt-2">
          We&apos;ll be in touch within 7 days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="volunteer-name" className="font-semibold">
            Full Name *
          </Label>
          <Input
            id="volunteer-name"
            type="text"
            placeholder="Your full name"
            value={formData.fullName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, fullName: e.target.value }))
            }
            className="rounded-xl border-gray-200 focus:border-brand-blue focus:ring-brand-blue/20"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="volunteer-email" className="font-semibold">
            Email *
          </Label>
          <Input
            id="volunteer-email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            className="rounded-xl border-gray-200 focus:border-brand-blue focus:ring-brand-blue/20"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="volunteer-phone" className="font-semibold">
          Phone (optional)
        </Label>
        <Input
          id="volunteer-phone"
          type="tel"
          placeholder="Your phone number"
          value={formData.phone}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, phone: e.target.value }))
          }
          className="rounded-xl border-gray-200 focus:border-brand-blue focus:ring-brand-blue/20"
        />
      </div>

      <div className="space-y-3">
        <Label className="font-semibold">Roles (select at least one) *</Label>
        <div className="flex flex-wrap gap-3">
          {volunteerRoles.map((role) => (
            <label
              key={role}
              className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 rounded-lg px-4 py-2.5 cursor-pointer transition-colors"
            >
              <Checkbox
                checked={formData.roles.includes(role)}
                onCheckedChange={(checked) =>
                  handleRoleChange(role, checked as boolean)
                }
              />
              <span className="text-sm font-medium text-brand-dark">{role}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="volunteer-availability" className="font-semibold">
          Availability (optional)
        </Label>
        <Input
          id="volunteer-availability"
          type="text"
          placeholder="e.g. Saturdays, weekday evenings"
          value={formData.availability}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, availability: e.target.value }))
          }
          className="rounded-xl border-gray-200 focus:border-brand-blue focus:ring-brand-blue/20"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="volunteer-message" className="font-semibold">
          Anything else? (optional)
        </Label>
        <Textarea
          id="volunteer-message"
          placeholder="Tell us about yourself or any questions you have"
          value={formData.message}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, message: e.target.value }))
          }
          className="rounded-xl border-gray-200 focus:border-brand-blue focus:ring-brand-blue/20 min-h-[80px]"
        />
      </div>

      <Button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-brand-dark hover:bg-black text-white rounded-xl py-3.5 font-bold text-base"
      >
        {status === "loading" ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            Sign Up to Volunteer
            <ArrowRight className="w-5 h-5 ml-2" />
          </>
        )}
      </Button>
    </form>
  );
}
