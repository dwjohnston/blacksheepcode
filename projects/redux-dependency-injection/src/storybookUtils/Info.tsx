
import React from 'react';

export type InfoProps = React.PropsWithChildren<{}>;


export const Info = (props: InfoProps) => {
  const {  children} = props;


  return (
    <div style  = {{border: "solid 1px #aaf", borderRadius: 10}}>
      {children}
    </div>
  );
};
