
import React from 'react';
import { PreferredTimeZoneSelector } from './components/PreferredTimeZoneSelector/PreferredTimeZoneSelector';
import { TimeDisplay } from './components/TimeDisplay/TimeDisplay';
import { useTimezone, } from './useTimeZone';
import { Provider } from "react-redux";
import { store } from "./store";
export type Solution1App1Props = {
};



const App = () => {

    const { preferredTimezone, setPreferredTimezone } = useTimezone();
    return <>
        <PreferredTimeZoneSelector preferredTimeZone={preferredTimezone} onChange={setPreferredTimezone} />
        <TimeDisplay time="2022-07-29T02:14:10.910Z" />
    </>
}

export const Solution2App1 = (props: Solution1App1Props) => {
    const { } = props;

    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};
