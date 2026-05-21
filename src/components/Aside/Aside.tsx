import type { PropsWithChildren } from "react";

type AsideProps = PropsWithChildren<{}>;

export function Aside(props: AsideProps) {
  return (
    <figure className="aside">
      <div className="triangle" />
      <div className="triangle-drop-shadow" />

      {props.children}
    </figure>
  );
}
