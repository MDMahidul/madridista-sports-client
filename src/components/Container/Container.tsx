import { ReactNode } from "react";

type TContainerProps={
    children:ReactNode
}
const Container = ({ children }:TContainerProps) => {
  return (
    <div className="max-w-[2520px] xl:px-14 md:px-10 sm:px-2 px-4">
      {children}
    </div>
  );
};

export default Container;
