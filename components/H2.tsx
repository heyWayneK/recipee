import React, { ReactNode } from "react";

function H2({ children }: { children: ReactNode }) {
  return <h2 className=" size-5 capitalize text-black">{children}</h2>;
}

export default H2;
