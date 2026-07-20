"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useSelection } from "@/context/SelectionContext";
import { WaitlistForm } from "./WaitlistForm";

export function AccessModal() {
  const { accessModalOpen, closeAccessModal, accessModalSource } =
    useSelection();

  return (
    <AnimatePresence>
      {accessModalOpen ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label="Close modal backdrop"
            onClick={closeAccessModal}
          />
          <motion.div
            className="relative z-10 w-full max-w-md rounded-t-lg border border-white/10 bg-[#070707] sm:rounded-sm"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
          >
            <button
              type="button"
              onClick={closeAccessModal}
              className="absolute right-3 top-3 rounded-sm border border-white/10 p-2 text-white"
              aria-label="Close"
            >
              <X size={16} />
            </button>
            <div className="p-4 pt-12 sm:p-5 sm:pt-12">
              <WaitlistForm
                source={accessModalSource}
                heading="REQUEST EARLY ACCESS"
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
