import React from 'react';
import { Controller } from 'react-hook-form';

const Textarea: React.FC<TextareaProps> = ({
  className,
  control,
  name,
  value,
  rows,
  cols,
  placeholder,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <textarea
          placeholder={placeholder}
          className={className}
          rows={rows}
          cols={cols}
          {...props}
          {...field}
        />
      )}
    />
  );
};

export default Textarea;
