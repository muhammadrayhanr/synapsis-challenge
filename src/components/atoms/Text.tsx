import React from 'react';

const Text: React.FC<TextProps & { required?: boolean }> = ({
  type = 'span',
  text,
  className,
  required = false,
  ...props
}) => {
  return React.createElement(`${type}`, {
    dangerouslySetInnerHTML: {
      __html: `${text} ${required ? '<span style="color: red;">*</span>' : ''}`,
    },
    className: `${className} m-0`,
    ...props,
  });
};

export default Text;
