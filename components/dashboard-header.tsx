import { ReactNode } from "react";

interface DashboardHeaderProps {
  heading: string;
  text?: string;
  children?: ReactNode;
}

const DashboardHeader = ({ heading, text, children }: DashboardHeaderProps) => {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
        <h1 className="font-extrabold text-3xl lg:text-4xl">{heading}</h1>
        {text && <p className="text-lg text-muted-foreground">{text}</p>}
      </div>
      { children }
    </div>
  );
};

export default DashboardHeader;
