"use client";
import React from "react";

interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  options: Option[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, defaultValue, onChange }) => {
  const [selected, setSelected] = React.useState(defaultValue || options[0]?.value || "");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelected(value);
    onChange?.(value);
  };

  return (
    <div className="m-8">
      <select
        value={selected}
        onChange={handleChange}
        className="w-full text-lg p-4 border rounded"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const switchOptions: Option[] = [
  { label: "表示選択", value: "" },
  { label: "カード形式", value: "card" },
  { label: "リスト形式", value: "list" },
];

export const Switching: React.FC<{ onChange: (value: string) => void }> = ({ onChange }) => {
  return (
    <Dropdown options={switchOptions} defaultValue="" onChange={onChange} />
  );
};