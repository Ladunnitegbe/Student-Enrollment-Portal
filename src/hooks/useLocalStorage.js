import { useState, useEffect } from "react";

// Drop-in replacement for useState that persists the value to
// localStorage under `key`, so it survives page refreshes.
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch {
      // localStorage unavailable (private browsing, SSR, etc.) — fall
      // back to the initial value instead of crashing the app.
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore write failures (e.g. storage full or disabled)
    }
  }, [key, value]);

  return [value, setValue];
}
