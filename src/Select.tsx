import React from "react";

type SelectProps<T extends string> = { id: string, options: T[], onChange: (newValue: T) => void };

export function Select<T extends string>({id, options, onChange}: SelectProps<T>): React.ReactElement {
  return (
    <select id={id} onChange={(event => onChange(event.target.value as unknown as T))}>
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  );
}
