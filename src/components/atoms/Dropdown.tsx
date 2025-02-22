import React from 'react';
import { Controller, Control } from 'react-hook-form';

interface Option {
  label: string;
  value: string | number;
}

interface DropdownProps {
  control: Control<any>;
  name: string;
  options: Option[];
  className?: string;
  placeholder?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ control, name, options, className, placeholder }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <select
          data-testid={name}
          className={`${className} placeholder:text-[12px] font-normal text-[12px] focus:outline-[#2C8EE8]`}
          onChange={onChange}
          value={value ?? ''}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    />
  );
};

export default Dropdown;
