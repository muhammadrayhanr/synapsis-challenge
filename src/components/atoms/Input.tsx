import { Controller } from 'react-hook-form';
import React from 'react';

const Input: React.FC<InputProps> = ({
  name,
  control,
  className,
  placeholder,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <input
          data-testid={name}
          className={`${className} placeholder:text-[12px] font-normal text-[12px] focus:outline-[#2C8EE8] `}
          onChange={onChange}
          placeholder={placeholder}
          value={value ?? ''}
          {...props}
        />
      )}
    />
  );
};

export default Input;
