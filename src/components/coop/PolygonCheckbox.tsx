interface PolygonCheckboxProps {
  name: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PolygonCheckbox({
  name,
  checked,
  onChange,
}: PolygonCheckboxProps) {
  return (
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:ring-offset-0"
        checked={checked}
        onChange={onChange}
      />
      <span className="ml-2">{name}</span>
    </label>
  );
}
