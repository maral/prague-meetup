import Link from "next/link";
import { RefObject, useState } from "react";
import { XLg } from "react-bootstrap-icons";

interface PanelProps {
  title: string;
  children?: React.ReactNode;
  divRef?: RefObject<HTMLDivElement>;
  expanded: boolean;
}

export default function Panel({ title, divRef, children }: PanelProps) {
  return (
    <div className="relative h-full bg-rose-50">
      <div className="text-main sticky top-0 flex h-16 w-full items-center justify-between bg-indigo-700 px-6 py-8 text-white lg:h-24">
        <h1 className="relative font-lead text-xl font-extrabold tracking-wide lg:text-2xl">
          {title}
        </h1>
        <Link href="/" className="transition-all hover:scale-125">
          <XLg size={24} />
        </Link>
      </div>
      <div
        ref={divRef}
        className="scrollbar-thumb-radius h-[calc(100%-4rem)] w-full overflow-y-auto py-6 pl-6 pr-[calc(1.5rem-8px)] font-primary scrollbar-thin scrollbar-thumb-indigo-700 lg:h-[calc(100vh-6rem)]"
        style={{ scrollbarGutter: "stable" }}
      >
        {children}
      </div>
    </div>
  );
}
