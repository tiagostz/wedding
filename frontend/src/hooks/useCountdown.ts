import { useEffect, useState } from "react";

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function diff(targetDate: Date): Countdown {
  const total = Math.max(0, targetDate.getTime() - Date.now());

  return {
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

/** Contador regressivo que atualiza a cada segundo até a data do casamento. */
export function useCountdown(targetDate: Date): Countdown {
  const [value, setValue] = useState<Countdown>(() => diff(targetDate));
  const targetTimestamp = targetDate.getTime();

  useEffect(() => {
    const id = setInterval(() => setValue(diff(new Date(targetTimestamp))), 1000);
    return () => clearInterval(id);
  }, [targetTimestamp]);

  return value;
}
