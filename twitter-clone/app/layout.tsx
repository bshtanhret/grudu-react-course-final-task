import { FC, PropsWithChildren } from "react";
import "@app/styles/global.css";

const layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html>
      <head />
      <body>{children}</body>
    </html>
  );
};

export default layout;
