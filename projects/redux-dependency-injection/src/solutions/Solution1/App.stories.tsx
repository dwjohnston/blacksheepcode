
import React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Index } from './App';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Solution1/App',
  component: Index,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
} as ComponentMeta<typeof Index>;

export const Default = () => {
  return <Index />;
};
