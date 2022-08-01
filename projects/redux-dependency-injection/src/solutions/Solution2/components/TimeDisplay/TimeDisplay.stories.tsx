
import React from 'react';
import { ComponentMeta } from '@storybook/react';

import { TimeDisplay } from './TimeDisplay';
import { Info } from '../../../../storybookUtils/Info';
import { Provider } from "react-redux";
import { store } from '../../store';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Solution2/TimeDisplay',
  component: TimeDisplay,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
} as ComponentMeta<typeof TimeDisplay>;

export const InvalidDate = () => {

  //These stories error out because we don't have the Provider instantiated
  return <TimeDisplay time="invaliddate" />;
};


export const IsoStringDate = () => {
  //These stories error out because we don't have the Provider instantiated<
  return <TimeDisplay time="2022-07-29T02:14:10.910Z" />;
};


export const InvalidDateWithProvider = () => {

  return <Provider store={store}>  <Info>
    <p>We can add the provider</p>
    <p>In this case I'm using the 'production' store - which I don't like.</p>
    <p>In the real world, the action dispatches are likely to be making API calls etc. </p>
    <p>Also, I'd be bringing in the full data model, just to test this one componenent.</p>
    <p>I could create a 'test' store - but now I have to maintain two sets of data model, reducers etc!</p>
  </Info>
    <TimeDisplay time="invaliddate" /></Provider>;
};


export const IsoStringDateWithProvider = () => {
  return <Provider store={store}>  <Info>
    <p>We can add the provider</p>
    <p>In this case I'm using the 'production' store - which I don't like.</p>
    <p>In the real world, the action dispatches are likely to be making API calls etc. </p>
    <p>Also, I'd be bringing in the full data model, just to test this one componenent.</p>
    <p>I could create a 'test' store - but now I have to maintain two sets of data model, reducers etc!</p>
  </Info>
    <TimeDisplay time="2022-07-29T02:14:10.910Z" /> </Provider >;
};
