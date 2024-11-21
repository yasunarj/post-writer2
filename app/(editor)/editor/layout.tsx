import { ReactNode } from "react";

const EditorLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container mx-auto grid items-center gap-10 py-8">
      { children }
    </div>
  );
};

export default EditorLayout;
