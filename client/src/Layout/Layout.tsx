import React from "react";
import { Header } from "../Components/Header/Header";
import { Footer } from "../Components/Footer/Footer";

export const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};
