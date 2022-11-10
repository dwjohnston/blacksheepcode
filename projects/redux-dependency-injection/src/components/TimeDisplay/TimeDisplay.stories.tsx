
import React from 'react';
import { ComponentMeta } from '@storybook/react';

import { TimeDisplay } from './TimeDisplay';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TimeDisplay/TimeDisplay',
  component: TimeDisplay,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
} as ComponentMeta<typeof TimeDisplay>;

export const InvalidDate = () => {
  return <TimeDisplay time = "invaliddate" />;
};


export const IsoStringDate = () => {
    return <TimeDisplay time = "2022-07-29T02:14:10.910Z" />;
  };
  