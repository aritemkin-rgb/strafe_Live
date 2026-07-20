"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getAnonymousSessionId } from "@/lib/anonymousSession";
import type { SideId, TheaterId } from "@/data/theaters";

interface SelectionState {
  theaterId: TheaterId | null;
  sideId: SideId | null;
  signupComplete: boolean;
  queuePosition: number | null;
  email: string | null;
  callsign: string | null;
}

interface SelectionContextValue extends SelectionState {
  setTheater: (id: TheaterId | null) => void;
  selectSide: (side: SideId, theater: TheaterId | null) => Promise<void>;
  clearSelection: () => void;
  markSignupComplete: (payload: {
    email: string;
    callsign?: string;
    queuePosition: number;
  }) => Promise<void>;
  openAccessModal: (source?: string) => void;
  closeAccessModal: () => void;
  accessModalOpen: boolean;
  accessModalSource: string;
}

const STORAGE_KEY = "strafe_selection_v1";

const SelectionContext = createContext<SelectionContextValue | null>(null);

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SelectionState>({
    theaterId: null,
    sideId: null,
    signupComplete: false,
    queuePosition: null,
    email: null,
    callsign: null,
  });
  const [accessModalOpen, setAccessModalOpen] = useState(false);
  const [accessModalSource, setAccessModalSource] = useState("nav");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as SelectionState;
        setState(parsed);
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const trackSelection = useCallback(
    async (
      side: SideId,
      theater: TheaterId | null,
      eventType: "select" | "signup_complete",
    ) => {
      try {
        await fetch("/api/selection", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            anonymousSessionId: getAnonymousSessionId(),
            selectedTheater: theater,
            selectedSide: side,
            eventType,
          }),
        });
      } catch {
        // analytics should not block UX
      }
    },
    [],
  );

  const setTheater = useCallback((id: TheaterId | null) => {
    setState((prev) => ({ ...prev, theaterId: id }));
  }, []);

  const selectSide = useCallback(
    async (side: SideId, theater: TheaterId | null) => {
      setState((prev) => ({
        ...prev,
        sideId: side,
        theaterId: theater,
        signupComplete: false,
      }));
      await trackSelection(side, theater, "select");
    },
    [trackSelection],
  );

  const clearSelection = useCallback(() => {
    setState((prev) => ({
      ...prev,
      sideId: null,
      theaterId: null,
      signupComplete: false,
      queuePosition: null,
    }));
  }, []);

  const markSignupComplete = useCallback(
    async (payload: {
      email: string;
      callsign?: string;
      queuePosition: number;
    }) => {
      setState((prev) => ({
        ...prev,
        signupComplete: true,
        email: payload.email,
        callsign: payload.callsign ?? null,
        queuePosition: payload.queuePosition,
      }));
      if (state.sideId) {
        await trackSelection(
          state.sideId,
          state.theaterId,
          "signup_complete",
        );
      }
    },
    [state.sideId, state.theaterId, trackSelection],
  );

  const openAccessModal = useCallback((source = "nav") => {
    setAccessModalSource(source);
    setAccessModalOpen(true);
  }, []);

  const closeAccessModal = useCallback(() => {
    setAccessModalOpen(false);
  }, []);

  const value = useMemo<SelectionContextValue>(
    () => ({
      ...state,
      setTheater,
      selectSide,
      clearSelection,
      markSignupComplete,
      openAccessModal,
      closeAccessModal,
      accessModalOpen,
      accessModalSource,
    }),
    [
      state,
      setTheater,
      selectSide,
      clearSelection,
      markSignupComplete,
      openAccessModal,
      closeAccessModal,
      accessModalOpen,
      accessModalSource,
    ],
  );

  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  );
}

export function useSelection() {
  const ctx = useContext(SelectionContext);
  if (!ctx) {
    throw new Error("useSelection must be used within SelectionProvider");
  }
  return ctx;
}
