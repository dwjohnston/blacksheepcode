
import React from 'react';
import { ComponentMeta } from '@storybook/react';

import { TimeDisplay } from './TimeDisplay';
import { Info } from '../../../../storybookUtils/Info';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Solution1/TimeDisplay',
  component: TimeDisplay,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
} as ComponentMeta<typeof TimeDisplay>;

export const InvalidDate = () => {

  <Info>These stories work fine, because the component access the default value of `preferredTimezone` which is `null`</Info>
  return <TimeDisplay time = "invaliddate" />;
};


export const IsoStringDate = () => {
    <Info>These stories work fine, because the component access the default value of `preferredTimezone` which is `null`</Info>
    return <TimeDisplay time = "2022-07-29T02:14:10.910Z" />;
  };
  