'use client';

import MuiStack from '@mui/material/Stack';
import type { ComponentProps, ElementType } from 'react';

type ResponsiveStackProps = ComponentProps<typeof MuiStack> & {
  component?: ElementType;
  alignItems?: unknown;
  justifyContent?: unknown;
  textAlign?: unknown;
};

export function ResponsiveStack({ alignItems, justifyContent, textAlign, sx, ...props }: ResponsiveStackProps) {
  return (
    <MuiStack
      {...props}
      sx={{
        ...(sx as object),
        ...(alignItems !== undefined ? { alignItems } : {}),
        ...(justifyContent !== undefined ? { justifyContent } : {}),
        ...(textAlign !== undefined ? { textAlign } : {}),
      }}
    />
  );
}
