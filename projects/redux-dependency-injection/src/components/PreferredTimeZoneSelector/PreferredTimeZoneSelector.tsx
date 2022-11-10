import React from 'react';
import { allTimeZones } from './allTimeZones';

export type PreferredTimeZoneSelectorProps = {

    preferredTimeZone: string | null;
    onChange: (newTimeZone: string) => void;
};



export const PreferredTimeZoneSelector = (props: PreferredTimeZoneSelectorProps) => {
    const {
        preferredTimeZone,
        onChange
    } = props;


    return (
        <div>
            <select value={preferredTimeZone || ""} onChange={(e) => {
                onChange(e.target.value);
            }}>

                <option value="" disabled>(None selected)</option>
                {allTimeZones.map((v) => {
                    return <option
                        value={v}
                        key={v}
                    >{v}</option>
                })}
            </select>
        </div>
    );
};
