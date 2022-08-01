import React from 'react';

export type TimeDisplayProps = {

    time: string; 
};



export const TimeDisplay = (props: TimeDisplayProps) => {
  const {time  } = props;


  return (
    <div>
      <p>Plain Text: {time}</p>
      <p>Locale Formatted: {new Date(time).toLocaleString()}</p>
    </div>
  );
};
