import { UiProps } from "@/types/ui";
import { useState } from "react";
import { Check, Clipboard } from "react-bootstrap-icons";

interface CopyUrlProps extends UiProps {
  url: string;
}

export default function CopyUrl({ url, className }: CopyUrlProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    setCopied(true);
    navigator.clipboard.writeText(url);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className={`flex flex-col items-end ${className ?? ""}`}>
      <button onClick={copyToClipboard} className="peer mr-2 bg-indigo-400 px-2 py-1 rounded-t-md text-white text-sm transition-all hover:bg-indigo-500">
        {copied
          ? <><Check className="inline" size={18} /> Zkopírováno!</>
          : <><Clipboard className="inline" /> Kopírovat</>
        }
      </button>
      <div className="bg-white border-2 border-indigo-400 rounded-md p-2 transition-all peer-hover:border-indigo-500">{url}</div>
    </div>
  );
}