import React from 'react';
import { useTimezone } from '../../TimeZoneProvider';

export type TimeDisplayProps = {

    time: string; 
};



export const TimeDisplay = (props: TimeDisplayProps) => {
  const {time  } = props;


  const {preferredTimezone} = useTimezone(); 

  return (
    <div>
      <p>Plain Text: {time}</p>
      <p>Locale Formatted: {new Date(time).toLocaleString()}</p>

      <p style = {{border: "solid 1px red"}}>Time Zone specific:  {new Date(time).toLocaleString("en-GB", {
        timeZone: preferredTimezone || undefined
      })} ({JSON.stringify(preferredTimezone)}) </p>
    </div>
  );
};
