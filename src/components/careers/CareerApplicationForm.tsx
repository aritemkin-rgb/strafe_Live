"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  name: z.string().min(1, "Enter your name").max(80),
  note: z.string().max(500).optional(),
  linkedin: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine(
      (value) => {
        if (!value) return true;
        try {
          const url = new URL(value);
          return (
            (url.protocol === "http:" || url.protocol === "https:") &&
            url.hostname.replace(/^www\./, "").endsWith("linkedin.com")
          );
        } catch {
          return false;
        }
      },
      { message: "Enter a valid LinkedIn URL" },
    ),
});

type FormValues = z.infer<typeof schema>;

export function CareerApplicationForm({
  role,
  onClose,
}: {
  role: string;
  onClose?: () => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (values) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          name: values.name,
          role,
          note: values.note ?? "",
          linkedin: values.linkedin ?? "",
        }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) throw new Error(json.error || "Application failed");
      setDone(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  });

  if (done) {
    return (
      <div className="mt-4 rounded-sm border border-white/10 bg-black p-4">
        <p className="font-mono text-[11px] tracking-[0.22em] text-[#EF4444]">
          APPLICATION RECEIVED
        </p>
        <p className="mt-2 text-sm text-[#B5B5BB]">
          Thanks — your application for {role} is under review.
        </p>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="mt-4 text-[11px] tracking-[0.16em] text-[#83838A] underline-offset-4 hover:text-white hover:underline"
          >
            CLOSE
          </button>
        ) : null}
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-4 space-y-3 rounded-sm border border-white/10 bg-black p-4"
    >
      <p className="font-mono text-[10px] tracking-[0.18em] text-[#EF4444]">
        APPLY · {role.toUpperCase()}
      </p>

      <label className="block space-y-2">
        <span className="font-mono text-[10px] tracking-[0.18em] text-[#83838A]">
          EMAIL
        </span>
        <input
          type="email"
          autoComplete="email"
          className="w-full rounded-sm border border-white/15 bg-[#0C0C0D] px-3 py-3 text-sm text-white outline-none ring-[#EF4444] placeholder:text-[#83838A] focus:ring-1"
          placeholder="you@domain.com"
          {...register("email")}
        />
        {errors.email ? (
          <span className="text-xs text-[#EF4444]">{errors.email.message}</span>
        ) : null}
      </label>

      <label className="block space-y-2">
        <span className="font-mono text-[10px] tracking-[0.18em] text-[#83838A]">
          NAME
        </span>
        <input
          type="text"
          autoComplete="name"
          className="w-full rounded-sm border border-white/15 bg-[#0C0C0D] px-3 py-3 text-sm text-white outline-none ring-[#EF4444] placeholder:text-[#83838A] focus:ring-1"
          placeholder="Your name"
          {...register("name")}
        />
        {errors.name ? (
          <span className="text-xs text-[#EF4444]">{errors.name.message}</span>
        ) : null}
      </label>

      <label className="block space-y-2">
        <span className="font-mono text-[10px] tracking-[0.18em] text-[#83838A]">
          LINKEDIN (OPTIONAL)
        </span>
        <input
          type="url"
          className="w-full rounded-sm border border-white/15 bg-[#0C0C0D] px-3 py-3 text-sm text-white outline-none ring-[#EF4444] placeholder:text-[#83838A] focus:ring-1"
          placeholder="https://www.linkedin.com/in/you"
          {...register("linkedin")}
        />
        {errors.linkedin ? (
          <span className="text-xs text-[#EF4444]">
            {errors.linkedin.message}
          </span>
        ) : null}
      </label>

      <label className="block space-y-2">
        <span className="font-mono text-[10px] tracking-[0.18em] text-[#83838A]">
          NOTE (OPTIONAL)
        </span>
        <textarea
          rows={3}
          className="w-full rounded-sm border border-white/15 bg-[#0C0C0D] px-3 py-3 text-sm text-white outline-none ring-[#EF4444] placeholder:text-[#83838A] focus:ring-1"
          placeholder="Why this role?"
          {...register("note")}
        />
      </label>

      {error ? <p className="text-xs text-[#EF4444]">{error}</p> : null}

      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="submit"
          disabled={loading}
          className="rounded-sm bg-[#EF4444] px-4 py-3 text-[11px] tracking-[0.16em] text-white transition hover:bg-red-500 disabled:opacity-60"
        >
          {loading ? "SUBMITTING…" : "SUBMIT APPLICATION"}
        </button>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="rounded-sm border border-white/15 px-4 py-3 text-[11px] tracking-[0.16em] text-white transition hover:border-white/40"
          >
            CANCEL
          </button>
        ) : null}
      </div>
    </form>
  );
}
