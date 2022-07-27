import './App.css';
import { SelectApproachA } from './components/SelectApproachA/SelectApproachA';
import { useMemo, useState } from 'react';
import { ApproachAScenario1Demo, ApproachAScenario2Demo, ApproachAScenario3Demo } from './demos/ApproachA';
import { ApproachBScenario1Demo, ApproachBScenario2Demo, ApproachBScenario3Demo } from './demos/ApproachB';
import { ApproachCScenario1Demo, ApproachCScenario2Demo, ApproachCScenario3Demo, ApproachCScenario4aDemo, ApproachCScenario4bDemo } from './demos/ApproachC';


const availableOptions = [
  {
    foo: "a",
    bar: 1
  },
  {
    foo: "b",
    bar: 2
  },
  {
    foo: "c",
    bar: 3
  }

];

const existingForm = {


  selectedFoo: "a"
};

function App() {


  return <>
    <ApproachAScenario1Demo availableOptions={availableOptions} />
    <ApproachAScenario2Demo availableOptions={availableOptions} existingForm={existingForm} />
    <ApproachAScenario3Demo availableOptions={availableOptions} />


    <ApproachBScenario1Demo availableOptions={availableOptions} />
    <ApproachBScenario2Demo availableOptions={availableOptions} existingForm={existingForm} />
    <ApproachBScenario3Demo availableOptions={availableOptions} />



    <ApproachCScenario1Demo availableOptions={availableOptions} />
    <ApproachCScenario2Demo availableOptions={availableOptions} existingForm={existingForm} />
    <ApproachCScenario3Demo availableOptions={availableOptions} />
    <ApproachCScenario4aDemo availableOptions={availableOptions} />
    <ApproachCScenario4bDemo availableOptions={availableOptions} />

  </>
}

export default App;
