import { useAnimate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const useTimer = (unit: string) => {
  const SECOND = 1000;
  const MINUTE = SECOND * 60;
  const HOUR = MINUTE * 60;
  const DAY = HOUR * 24;

  const [ref, animate] = useAnimate();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeRef = useRef(0);

  const [time, setTime] = useState(0);

  useEffect(() => {
    // get next 7 days
    const COUNTDOWN_FROM = new Date(Date.now() + 7 * DAY);

    intervalRef.current = setInterval(
      () => handleCountdown(COUNTDOWN_FROM),
      1000
    );

    return () => {
      if(intervalRef.current) clearInterval(intervalRef.current)
    };
  }, []);

  const handleCountdown = async (end:Date) => {
    const now = new Date();
    const distance = +end - +now;

    let newTime = 0;

    if (unit === "Day") {
      newTime = Math.floor(distance / DAY);
    } else if (unit === "Hour") {
      newTime = Math.floor((distance % DAY) / HOUR);
    } else if (unit === "Minute") {
      newTime = Math.floor((distance % HOUR) / MINUTE);
    } else {
      newTime = Math.floor((distance % MINUTE) / SECOND);
    }

    if (newTime !== timeRef.current) {
      // Exit animation
      await animate(
        ref.current,
        { y: ["0%", "-50%"], opacity: [1, 0] },
        { duration: 0.35 }
      );

      timeRef.current = newTime;
      setTime(newTime);

      // Enter animation
      await animate(
        ref.current,
        { y: ["50%", "0%"], opacity: [0, 1] },
        { duration: 0.35 }
      );
    }
  };

  return { ref, time };
};

export default useTimer;
