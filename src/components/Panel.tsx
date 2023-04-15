interface PanelProps {
  title: string;
  children?: React.ReactNode;
}

export default function Panel({ title, children }: PanelProps) {
  return (
    <div className="relative h-full bg-rose-50">
      <div className="text-main sticky top-0 flex h-16 w-full items-center justify-between bg-indigo-700 px-6 py-8 text-white lg:h-24">
        <h1 className="relative font-lead text-xl font-extrabold tracking-wide lg:text-2xl">
          {title}
        </h1>
      </div>
      <div className="scrollbar-thumb-radius max-h-[calc(40vh-4rem)] w-full overflow-y-auto p-6 font-primary scrollbar-thin scrollbar-thumb-rose-100 lg:max-h-[calc(100vh-6rem)]">
        {children}
      </div>
    </div>
  );
}