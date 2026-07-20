"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Image from "next/image";
import { useSelection } from "@/context/SelectionContext";
import { getFaction } from "@/data/theaters";
import { formatQueuePosition } from "@/lib/queueNumber";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  callsign: z.string().max(40).optional(),
});

type FormValues = z.infer<typeof schema>;

interface WaitlistFormProps {
  heading?: string;
  source?: string;
  showSideContext?: boolean;
  onChangeSide?: () => void;
  compact?: boolean;
}

export function WaitlistForm({
  heading,
  source = "homepage",
  showSideContext = false,
  onChangeSide,
  compact = false,
}: WaitlistFormProps) {
  const {
    theaterId,
    sideId,
    markSignupComplete,
    signupComplete,
    queuePosition,
  } = useSelection();
  const match = getFaction(sideId);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(signupComplete);

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
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          callsign: values.callsign ?? "",
          selectedTheater: theaterId,
          selectedSide: sideId,
          source,
          marketingConsent: false,
        }),
      });
      const json = (await res.json()) as {
        ok?: boolean;
        queuePosition?: number;
        error?: string;
      };
      if (!res.ok || !json.queuePosition) {
        throw new Error(json.error || "Signup failed");
      }
      await markSignupComplete({
        email: values.email,
        callsign: values.callsign,
        queuePosition: json.queuePosition,
      });
      setDone(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  });

  if (done || signupComplete) {
    return (
      <div className="space-y-4 rounded-sm border border-white/10 bg-[#0C0C0D] p-5">
        <p className="font-mono text-[11px] tracking-[0.22em] text-[#EF4444]">
          ACCESS REQUEST RECEIVED
        </p>
        <h3 className="font-display text-2xl text-white">
          {match ? (
            <>
              YOU JOINED THE SIDE OF
              <br />
              {match.faction.name.toUpperCase()}
            </>
          ) : (
            "YOU’RE ON THE LIST"
          )}
        </h3>
        {match ? (
          <div className="flex items-center gap-3">
            <Image
              src={match.faction.flagSrc}
              alt=""
              width={42}
              height={28}
              className="h-7 w-auto border border-white/10"
            />
            <div className="font-mono text-[11px] tracking-[0.14em] text-[#B5B5BB]">
              <div>THEATER {match.theater.name.toUpperCase()}</div>
              <div>ALLEGIANCE {match.faction.name.toUpperCase()}</div>
            </div>
          </div>
        ) : null}
        <div className="grid grid-cols-2 gap-3 font-mono text-[11px] tracking-[0.14em]">
          <div className="border border-white/10 p-3">
            <div className="text-[#83838A]">QUEUE POSITION</div>
            <div className="mt-1 text-white">
              {formatQueuePosition(queuePosition ?? 0)}
            </div>
            <div className="mt-2 text-[10px] text-[#83838A]">
              Estimated placement
            </div>
          </div>
          <div className="border border-white/10 p-3">
            <div className="text-[#83838A]">STATUS</div>
            <div className="mt-1 text-white">UNDER REVIEW</div>
            <div className="mt-2 text-[#EF4444]">FIRST WAVE</div>
          </div>
        </div>
        <p className="text-sm text-[#B5B5BB]">
          Invitations are issued in controlled waves.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`space-y-4 rounded-sm border border-white/10 bg-[#0C0C0D] ${compact ? "p-4" : "p-5"}`}
    >
      <div>
        <p className="font-mono text-[11px] tracking-[0.22em] text-[#EF4444]">
          PRIVATE BETA
        </p>
        <h3 className="mt-2 font-display text-2xl text-white sm:text-3xl">
          {heading ??
            (match
              ? `JOIN THE SIDE OF ${match.faction.name.toUpperCase()}`
              : "JOIN THE FIRST WAVE")}
        </h3>
        <p className="mt-2 text-sm text-[#B5B5BB]">
          Request private-beta access and reserve your place in the STRAFE
          civilian operator network.
        </p>
      </div>

      {showSideContext && match ? (
        <div className="grid grid-cols-3 gap-2 font-mono text-[10px] tracking-[0.14em] text-[#B5B5BB]">
          <div className="border border-white/10 p-2">
            <div className="text-[#83838A]">THEATER</div>
            <div className="mt-1 text-white">{match.theater.name}</div>
          </div>
          <div className="border border-white/10 p-2">
            <div className="text-[#83838A]">ALLEGIANCE</div>
            <div className="mt-1 text-white">{match.faction.name}</div>
          </div>
          <div className="border border-white/10 p-2">
            <div className="text-[#83838A]">ACCESS</div>
            <div className="mt-1 text-white">PRIVATE BETA</div>
          </div>
        </div>
      ) : null}

      <label className="block space-y-2">
        <span className="font-mono text-[10px] tracking-[0.18em] text-[#83838A]">
          EMAIL ADDRESS
        </span>
        <input
          type="email"
          autoComplete="email"
          className="w-full rounded-sm border border-white/15 bg-black px-3 py-3 text-sm text-white outline-none ring-[#EF4444] placeholder:text-[#83838A] focus:ring-1"
          placeholder="you@domain.com"
          {...register("email")}
        />
        {errors.email ? (
          <span className="text-xs text-[#EF4444]">{errors.email.message}</span>
        ) : null}
      </label>

      <label className="block space-y-2">
        <span className="font-mono text-[10px] tracking-[0.18em] text-[#83838A]">
          OPERATOR CALLSIGN (OPTIONAL)
        </span>
        <input
          type="text"
          className="w-full rounded-sm border border-white/15 bg-black px-3 py-3 text-sm text-white outline-none ring-[#EF4444] placeholder:text-[#83838A] focus:ring-1"
          placeholder="CIVOP_0000"
          {...register("callsign")}
        />
      </label>

      {error ? <p className="text-xs text-[#EF4444]">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-sm bg-[#EF4444] px-4 py-3 text-xs tracking-[0.18em] text-white transition hover:bg-red-500 disabled:opacity-60"
      >
        {loading ? "SUBMITTING…" : "SIGN UP FOR BETA ACCESS"}
      </button>

      {onChangeSide ? (
        <button
          type="button"
          onClick={onChangeSide}
          className="w-full text-xs tracking-[0.16em] text-[#83838A] underline-offset-4 hover:text-white hover:underline"
        >
          CHANGE SIDE
        </button>
      ) : null}
    </form>
  );
}
