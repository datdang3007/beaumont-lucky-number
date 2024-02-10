import { ReactNode } from "react";
import "./style.css";

type Props = {
  children: ReactNode;
};

export const BackGround = ({ children }: Props) => {
  return <div className="slider-thumb">{children}</div>;
};
