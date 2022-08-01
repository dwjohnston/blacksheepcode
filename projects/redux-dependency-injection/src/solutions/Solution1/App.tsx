
import React from 'react';
import { PreferredTimeZoneSelector } from './components/PreferredTimeZoneSelector/PreferredTimeZoneSelector';
import PreferredTimeZoneSelectorStories from './components/PreferredTimeZoneSelector/PreferredTimeZoneSelector.stories';
import { TimeDisplay } from './components/TimeDisplay/TimeDisplay';
import { TimeZoneProvider, useTimezone } from './TimeZoneProvider';


const App = () => {

    const { preferredTimezone, setPreferredTimezone } = useTimezone();
    return <>
        <PreferredTimeZoneSelector preferredTimeZone={preferredTimezone} onChange={setPreferredTimezone} />
        <TimeDisplay time="2022-07-29T02:14:10.910Z" />
    </>
}

export const Index = () => {
    return (
        <TimeZoneProvider>
            <App />
        </TimeZoneProvider>
    );
};
