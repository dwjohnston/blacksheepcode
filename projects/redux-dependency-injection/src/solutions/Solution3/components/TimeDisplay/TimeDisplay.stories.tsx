
import React from 'react';
import { ComponentMeta } from '@storybook/react';

import { TimeDisplay } from './TimeDisplay';
import { Info } from '../../../../storybookUtils/Info';
import { Provider } from "react-redux";
import { store } from '../../store';
import { ReduxTimeZoneProvider, TimeZoneProvider } from '../../useTimeZone';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Solution3/TimeDisplay',
  component: TimeDisplay,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
} as ComponentMeta<typeof TimeDisplay>;

export const InvalidDate = () => {

  return <>  <Info>We no longer have the problem that solution 2 has, because we can now use the default values on the context  </Info>
    <TimeDisplay time="invaliddate" /></>;
};


export const IsoStringDate = () => {

  return <><Info>We no longer have the problem that solution 2 has, because we can now use the default values on the context</Info><TimeDisplay time="2022-07-29T02:14:10.910Z" /></>;
};


export const IsoStringDateWithMelbourneTimezone = () => {
  return <><TimeZoneProvider
    preferredTimezone="Australia/Melbourne"
    setPreferredTimezone={() => { }}
  >
    <Info>We no longer have the problem that solution 2 has, because we can now use the default values on the context</Info>
    <TimeDisplay time="2022-07-29T02:14:10.910Z" />
  </TimeZoneProvider>
  </>;
};


export const UsingReduxProvider = () => {
  return <ReduxTimeZoneProvider>
        <TimeDisplay time="2022-07-29T02:14:10.910Z" />
  </ReduxTimeZoneProvider>
}
