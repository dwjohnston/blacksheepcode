import React, { useState } from "react";
import { createSetPreferredTimezoneAction, selectPreferredTimezone } from "./store";
import {useDispatch, useSelector} from "react-redux"; 


type TimeZoneContextType = {

    preferredTimezone: string | null;
    setPreferredTimezone: (tz: string) => void;

}
const TimeZoneProviderContext = React.createContext<TimeZoneContextType>({
    preferredTimezone: null,
    setPreferredTimezone: () => {
        console.warn("TimezoneProvider not implemented, this is a noop");
    }
})

// Fully flexible generic provider
export const TimeZoneProvider = (props: React.PropsWithChildren<TimeZoneContextType>) => {

    const { children, ...rest } = props;
    return <TimeZoneProviderContext.Provider value={rest}>{children}</TimeZoneProviderContext.Provider>
}


export const useTimezone = () => {
    return React.useContext(TimeZoneProviderContext);
}


// Our 'production' provider
export const ReduxTimeZoneProvider = (props: React.PropsWithChildren<{}>) => {
    const dispatch = useDispatch();
    const preferredTz = useSelector(selectPreferredTimezone);


    return <TimeZoneProvider
        preferredTimezone={preferredTz}
        setPreferredTimezone={(tz) => dispatch(createSetPreferredTimezoneAction(tz))}
>{props.children}</TimeZoneProvider>
}