import { rem } from '@mantine/core';
import { ComponentPropsWithoutRef } from 'react';

interface FilterIconProps extends ComponentPropsWithoutRef<'svg'> {
  size?: number | string;
}

export function FilterIcon({ size, style, ...others }: FilterIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: rem(size), height: rem(size), ...style }}
      {...others}
    >
      <path d="M7 12.5V10.5H11V12.5H7ZM3 7.5V5.5H15V7.5H3ZM0 2.5V0.5H18V2.5H0Z" fill="black" />
    </svg>
  );
}