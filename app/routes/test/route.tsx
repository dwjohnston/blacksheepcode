import anger from "~/assets/anger.webp";
import {GithubPermalink} from "react-github-permalink"; 

import {Prism as S} from "react-syntax-highlighter"; 





export default function(){
    return<div>
            I am some tsx

            <img src={anger} alt="I am anger"/>
            <S>a</S>
            <GithubPermalink permalink="https://github.com/dwjohnston/react-github-permalink/blob/5b15aa07e60af4e317086f391b28cadf9aae8e1b/sample_files/sample1.go#L1-L5"/>

    </div>
}