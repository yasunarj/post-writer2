import { ReactNode } from "react";

const Callout = ({ children }: { children: ReactNode }) => {
  return(
    <div className="my-6 flex items-center border border-1-4 p-4 rounded-md ">
      <div>{children}</div>
    </div>
  );
};

export default Callout;