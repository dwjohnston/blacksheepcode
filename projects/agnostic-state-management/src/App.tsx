/* eslint-disable @typescript-eslint/no-unused-vars */

import './App.css';

import { App as App1 } from './components/part1/App'; 
import { App as App2} from './components/part2/App'; 
import { App as App3  } from './components/part3/App'; 
import { App as App4} from './components/part4/App'; 
import { App as App5 } from './components/part5/App'; 
import { App as App6 } from './components/part6/App'; 
import { App as App7 } from './components/part7/App'; 
import { App as App8 } from './components/part8/App'; 

function Main() {
  return (
    <div className="App">
      {/* Change between the various approaches, see that they really work */}
      <App8/>
    </div>
  );
}

export default Main;
