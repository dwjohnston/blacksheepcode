import { ListOfArticles } from "~/generated/ListOfArticles";
import mainIcon from "../assets/bsc2.png";
export default function Index() {
  return (

    <>
      <div className="main">

        <div className="headline">
          <div className="logo-container">
            <img src={mainIcon} alt="A nerdy looking sheep" />
          </div>
          <div>
          <h1>Black Sheep Code</h1>
          <p>Personal Website of David Johnston</p>
          </div>
        </div>
        <div>
          <h2>Work</h2>
          <ul>
            <li><a href="https://github.com/dwjohnston" target="_blank">Github</a></li>
            <li><a href="https://stackoverflow.com/users/1068446/dwjohnston" target="_blank">Stack Overflow</a> </li>
          </ul>
        </div>

        <div>
          <h2>Art</h2>
          <ul>
            <li><a href="http://new.geoplanets.io/" target="_blank">GeoPlanets</a> - My first foray in to geometric art.
            </li>
          </ul>
        </div>


      </div>

      <div className="main">

        <h2>Blog</h2>
        <ListOfArticles />
      </div>

      <p className="open-source">I support open source: <a href="https://opencollective.com/blacksheepcode" target="_blank">Open Collective</a>
      </p>
    </>
  );
}
