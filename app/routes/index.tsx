import { ListOfArticles } from "~/generated/ListOfArticles";

export default function Index() {
  return (

    <>
      <div className="main">

        <h1>Black Sheep Code</h1>
        <p>Personal Website of David Johnston</p>

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
            <li><a href="https://tinymassive.herokuapp.com/" target="_blank">Rider on the Waves</a> - A submission for
              the Tiny Massive light show at the
              Reykavik Lights Festival, Iceland. (Hosted on Heroku, I'm suprised it's still running)</li>

          </ul>
        </div>


      </div>

      <div className ="main">

        <h2>Blog</h2>
        <ListOfArticles />
      </div>

      <p className ="open-source">I support open source: <a href="https://opencollective.com/blacksheepcode" target="_blank">Open Collective</a>
      </p>
    </>
  );
}
