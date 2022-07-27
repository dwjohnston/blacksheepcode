import './App.css';
import { SelectApproachA } from './components/SelectApproachA/SelectApproachA';
import { useMemo, useState } from 'react';


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

function App() {

  const [selectedOption, setSelectedOption] = useState(null as null | string)

  const fullSelectedOption = useMemo(() => {
    return availableOptions.find((v) => v.foo === selectedOption); // Or we could create a map first, which would be a bit more efficient
  }, [selectedOption]);

  return (
    <div className="App">

      <div>
        <h2>Select Approach A</h2>


        <h3>Scenario 1 - Parent wants the full selected object</h3>

        <p>The problem with this approach is that in the parent we need to write additional logic to look up the full selected object again</p>

        <SelectApproachA availableOptions={availableOptions} selectedOption={selectedOption} onChange ={setSelectedOption} label ="Scenario 1" name = "approach-a-scenario-1"
        generateLabelFn={(v) => v.foo}
        generateValueFn={(v) => v.foo}
        />

        <pre>{JSON.stringify({selectedOption}, null, 2)}</pre>
        <pre>{JSON.stringify({fullSelectedOption}, null, 2)}</pre>

      </div>
    </div>
  );
}

export default App;
