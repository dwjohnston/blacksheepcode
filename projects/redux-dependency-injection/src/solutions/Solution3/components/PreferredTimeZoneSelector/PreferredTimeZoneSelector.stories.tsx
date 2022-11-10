
import React, { useState } from 'react';
import { ComponentMeta } from '@storybook/react';

import { PreferredTimeZoneSelector } from './PreferredTimeZoneSelector';
import { Info } from '../../../../storybookUtils/Info';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Solution3/PreferredTimeZoneSelector',
    component: PreferredTimeZoneSelector,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {}
} as ComponentMeta<typeof PreferredTimeZoneSelector>;

export const Default = () => {

    const [tz, setTz] = useState(null as null | string);
    return <div>

        <Info>This works fine because the way we implemented it, the component doesn't hook into context</Info>

        <pre>{tz}</pre>
        <PreferredTimeZoneSelector
            preferredTimeZone={tz}
            onChange={setTz}
        />
    </div>;
};
