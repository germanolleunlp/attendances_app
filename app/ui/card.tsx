import styles from "./card.module.css";
import * as React from "react";

export default function Card({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
  title: string;
  description: string;
}) {
  return (
    <div
      className={`${styles.card} flex flex-col items-center justify-center border-2 border-gray-800 rounded-lg`}
    >
      <Icon className="text-indigo-400 w-12 h-12 mb-3 inline-block" />
      <h2 className="title-font font-medium text-3xl text-white">{title}</h2>
      <p className="leading-relaxed">{description}</p>
    </div>
  );
}
