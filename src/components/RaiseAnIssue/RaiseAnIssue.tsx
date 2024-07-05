
import React from 'react';

export type RaiseAnIssueProps = {
};



export const RaiseAnIssue = (props: RaiseAnIssueProps) => {


    return (
        <div className ="edit-with-github">
            <hr />
            <p>
                Found a bug? <a href={`https://github.com/dwjohnston/blacksheepcode/issues`}>Raise an issue here</a>
            </p>
        </div>
    );
};
