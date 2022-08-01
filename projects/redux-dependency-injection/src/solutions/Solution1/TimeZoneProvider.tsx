import React, { useState } from "react";


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

export const TimeZoneProvider = (props: React.PropsWithChildren<{
    initialPreferredTimezone?: string;
}>) => {

    const { children, initialPreferredTimezone } = props;

    const [tz, setTz] = useState(initialPreferredTimezone || null);

    return <TimeZoneProviderContext.Provider value={{
        preferredTimezone: tz,
        setPreferredTimezone: setTz
    }}>{children}</TimeZoneProviderContext.Provider>
}


export const useTimezone = () => {
    return React.useContext(TimeZoneProviderContext);
}