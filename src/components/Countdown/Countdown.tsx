import CountdownItem from "./CountdownItem";

const ShiftingCountdown = () => {
  return (
    <div className="bg-gradient-to-br">
      <div className="mx-auto flex w-full max-w-5xl items-center bg-white">
        <CountdownItem unit="Day" text="days" />
        <CountdownItem unit="Hour" text="hours" />
        <CountdownItem unit="Minute" text="minutes" />
        <CountdownItem unit="Second" text="seconds" />
      </div>
    </div>
  );
};

export default ShiftingCountdown;
