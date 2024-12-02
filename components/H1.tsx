import React, { ReactNode } from "react";

function H1({ children }: { children: ReactNode }) {
  return (
    <>
      <h1 className="capitalize text-black">{children}</h1>
    </>
  );
}

export default H1;
