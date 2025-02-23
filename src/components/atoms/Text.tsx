import React from 'react';

const Text: React.FC<TextProps> = ({
  type = 'span',
  text,
  className,
  ...props
}) => {
  return React.createElement(`${type}`, {
    dangerouslySetInnerHTML: {
      __html: text,
    },
    className: `${className} m-0`,
    ...props,
  });
};

export default Text;
