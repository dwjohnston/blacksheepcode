
import React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Solution3App1 } from './App';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Solution3/App',
  component: Solution3App1,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
} as ComponentMeta<typeof Solution3App1>;

export const Default = () => {
  return <Solution3App1 />;
};
