
import React from 'react';

export type EditWithGithubProps = {
    postName: string;
};



export const EditWithGithub = (props: EditWithGithubProps) => {
    const { postName } = props;



    return (
        <div className ="edit-with-github">
            <hr />
            <p>
                Spotted an error? <a href={`https://github.com/dwjohnston/blacksheepcode/tree/master/app/routes${postName}.mdx`}>Edit this page with Github</a>
            </p>
        </div>
    );
};
