import { promises as fs } from "fs";
import path from "path";
import type { SelectionInput, WaitlistInput } from "./validation";

const DATA_DIR = path.join(process.cwd(), ".data");
const WAITLIST_FILE = path.join(DATA_DIR, "waitlist.json");
const SELECTIONS_FILE = path.join(DATA_DIR, "selections.json");

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(file, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson(file: string, value: unknown) {
  await ensureDataDir();
  await fs.writeFile(file, JSON.stringify(value, null, 2), "utf8");
}

export interface LocalWaitlistRow extends WaitlistInput {
  id: string;
  created_at: string;
}

export interface LocalSelectionRow extends SelectionInput {
  id: string;
  created_at: string;
}

export async function appendLocalWaitlist(row: WaitlistInput) {
  const rows = await readJson<LocalWaitlistRow[]>(WAITLIST_FILE, []);
  const entry: LocalWaitlistRow = {
    ...row,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
  };
  rows.push(entry);
  await writeJson(WAITLIST_FILE, rows);
  return entry;
}

export async function appendLocalSelection(row: SelectionInput) {
  const rows = await readJson<LocalSelectionRow[]>(SELECTIONS_FILE, []);
  const entry: LocalSelectionRow = {
    ...row,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
  };
  rows.push(entry);
  await writeJson(SELECTIONS_FILE, rows);
  return entry;
}

export async function getLocalStats() {
  const waitlist = await readJson<LocalWaitlistRow[]>(WAITLIST_FILE, []);
  const selections = await readJson<LocalSelectionRow[]>(SELECTIONS_FILE, []);

  const sideCounts: Record<string, number> = {
    ukraine: 0,
    russia: 0,
    israel: 0,
    palestine: 0,
    "no-preference": 0,
  };

  const theaterCounts: Record<string, number> = {
    "eastern-europe": 0,
    levant: 0,
  };

  const signupBySide: Record<string, number> = {
    ukraine: 0,
    russia: 0,
    israel: 0,
    palestine: 0,
    "no-preference": 0,
  };

  const signupsByDay: Record<string, number> = {};

  for (const event of selections) {
    if (event.eventType === "select") {
      sideCounts[event.selectedSide] =
        (sideCounts[event.selectedSide] ?? 0) + 1;
      if (event.selectedTheater) {
        theaterCounts[event.selectedTheater] =
          (theaterCounts[event.selectedTheater] ?? 0) + 1;
      }
    }
    if (event.eventType === "signup_complete") {
      signupBySide[event.selectedSide] =
        (signupBySide[event.selectedSide] ?? 0) + 1;
    }
  }

  for (const row of waitlist) {
    const day = row.created_at.slice(0, 10);
    signupsByDay[day] = (signupsByDay[day] ?? 0) + 1;
  }

  return {
    totalWaitlist: waitlist.length,
    totalSelections: selections.filter((s) => s.eventType === "select").length,
    sideCounts,
    theaterCounts,
    signupBySide,
    signupsByDay,
    storage: "local" as const,
  };
}
