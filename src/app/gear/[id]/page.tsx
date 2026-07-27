import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DRONES, getDrone } from "@/data/drones";
import { DroneProfile } from "@/components/gear/DroneProfile";

export function generateStaticParams() {
  return DRONES.map((drone) => ({ id: drone.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const drone = getDrone(id);
  if (!drone) return { title: "Airframe — STRAFE.LIVE" };
  return {
    title: `${drone.shortName} — STRAFE.LIVE`,
    description: drone.summary,
  };
}

export default async function DronePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const drone = getDrone(id);
  if (!drone) notFound();
  return <DroneProfile drone={drone} />;
}
