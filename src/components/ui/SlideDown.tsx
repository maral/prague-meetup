import { useState } from "react";
import { ChevronUp, ChevronDown } from "react-bootstrap-icons";
import LinkButton from "./LinkButton";
import { UiProps } from "@/types/ui";

interface SlideDownProps extends UiProps {
  children?: React.ReactNode;
  hideText: string;
  showText: string;
  initialShow?: boolean;
}

export default function SlideDown({
  children,
  className,
  hideText,
  showText,
  initialShow = false,
}: SlideDownProps) {
  const [show, setShow] = useState(initialShow);
  return (
    <div className={className}>
      {show ? (
        <ChevronUp className="inline" />
      ) : (
        <ChevronDown className="inline" />
      )}
      <LinkButton className="mb-2 ml-2" onClick={() => setShow(!show)}>
        {show ? hideText : showText}
      </LinkButton>

      <div
        className={`${
          show ? "max-h-[1000px]" : "max-h-0"
        } overflow-hidden transition-all duration-300 ease-in-out`}
      >
        {children}
      </div>
    </div>
  );
}
