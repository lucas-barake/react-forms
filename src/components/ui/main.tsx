import React from "react";

type Props = {
  children: React.ReactNode;
};

export const Main: React.FC<Props> = ({ children }) => (
  <main className="mx-auto flex h-screen max-w-sm flex-col items-center justify-center gap-2 bg-background">
    {children}
  </main>
);
