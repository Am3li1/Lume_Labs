"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface ChoicePillsProps {
  options: string[];
  onSelect: (value: string) => void;
  onOther: () => void;
  /** Standalone "Skip" pill — for optional free-text questions with no fixed options. */
  allowSkip?: boolean;
  disabled?: boolean;
  /** Multi-select mode: taps toggle a selection, a Continue button submits the combined choice. */
  multiple?: boolean;
}

export default function ChoicePills({
  options,
  onSelect,
  onOther,
  allowSkip = false,
  disabled = false,
  multiple = false,
}: ChoicePillsProps) {
  const [selected, setSelected] = useState<string[]>([]);

  if (options.length === 0 && !allowSkip) return null;

  function toggle(option: string) {
    if (disabled) return;
    if (!multiple) {
      onSelect(option);
      return;
    }
    setSelected((prev) => (prev.includes(option) ? prev.filter((v) => v !== option) : [...prev, option]));
  }

  function confirmSelection() {
    if (selected.length === 0) return;
    onSelect(selected.join(", "));
    setSelected([]);
  }

  return (
    <div className="mb-3">
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = multiple && selected.includes(option);
          return (
            <motion.button
              key={option}
              type="button"
              disabled={disabled}
              onClick={() => toggle(option)}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: disabled ? 1 : 1.03 }}
              className={`rounded-xl border px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none ${
                isSelected
                  ? "border-accent bg-accent text-bg"
                  : "border-neutral-800 bg-neutral-900 text-neutral-200 hover:border-neutral-700 hover:bg-neutral-800"
              }`}
            >
              {isSelected && <span className="mr-1.5">✓</span>}
              {option}
            </motion.button>
          );
        })}

        {allowSkip && (
          <motion.button
            type="button"
            disabled={disabled}
            onClick={() => onSelect("Skip this question")}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: disabled ? 1 : 1.03 }}
            className="rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-2 text-sm text-neutral-500 transition-colors hover:border-neutral-700 hover:bg-neutral-800 disabled:opacity-50 disabled:pointer-events-none"
          >
            Skip
          </motion.button>
        )}

        <motion.button
          type="button"
          disabled={disabled}
          onClick={onOther}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: disabled ? 1 : 1.03 }}
          className="rounded-xl border border-dashed border-neutral-700 px-4 py-2 text-sm text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-neutral-200 disabled:opacity-50 disabled:pointer-events-none"
        >
          Other...
        </motion.button>
      </div>

      {multiple && (
        <motion.button
          type="button"
          disabled={disabled || selected.length === 0}
          onClick={confirmSelection}
          animate={{ opacity: selected.length > 0 ? 1 : 0.4 }}
          whileTap={{ scale: selected.length > 0 ? 0.97 : 1 }}
          className="mt-3 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-bg disabled:pointer-events-none"
        >
          Continue with {selected.length} selected
        </motion.button>
      )}
    </div>
  );
}