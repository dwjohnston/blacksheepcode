
import React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Solution2App1 } from './App';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Solution2/App',
  component: Solution2App1,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
} as ComponentMeta<typeof Solution2App1>;

export const Default = () => {
  return <Solution2App1 />;
};
