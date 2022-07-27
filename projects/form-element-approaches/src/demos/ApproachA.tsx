/*
 * COPYRIGHT NOTICE
 * All source code contained within the Cydarm cybersecurity software provided by Cydarm
 * Technologies Pty Ltd ABN 17 622 236 113 (Company) is the copyright of the Company and
 * protected by copyright laws. Redistribution or reproduction of this material is strictly prohibited
 * without prior written permission of the Company. All rights reserved.
 */
import { RecordableHistogram } from 'perf_hooks';
import React, { useMemo, useState } from 'react';
import { SelectApproachA } from '../components/SelectApproachA/SelectApproachA';

export type ApproachADemoProps = {
    availableOptions: Array<{
        foo: string;
        bar: number
    }>;
};



export const ApproachAScenario1Demo = (props: ApproachADemoProps) => {
    const { availableOptions } = props;
    const [selectedOption, setSelectedOption] = useState(null as null | string)

    const fullSelectedOption = useMemo(() => {
        return availableOptions.find((v) => v.foo === selectedOption); // Or we could create a map first, which would be a bit more efficient
    }, [selectedOption, availableOptions]);

    return (
        <div className="App">

            <div className="panel">
                <h2>Select Approach A</h2>


                <h3>Scenario 1 - Parent wants the full selected object</h3>

                <p>The problem with this approach is that in the parent we need to write additional logic to look up the full selected object again</p>

                <SelectApproachA availableOptions={availableOptions} selectedOption={selectedOption} onChange={setSelectedOption} label="Select Item" name="item"
                    generateLabelFn={(v) => v.foo}
                    generateValueFn={(v) => v.foo}
                />

                <pre>{JSON.stringify({ selectedOption }, null, 2)}</pre>
                <pre>{JSON.stringify({ fullSelectedOption }, null, 2)}</pre>

            </div>



        </div>);
};


export const ApproachAScenario2Demo = (props: {
    availableOptions: Array<{
        foo: string;
        bar: number
    }>;

    existingForm: {
        selectedFoo: string;
    }
}) => {
    const { availableOptions, existingForm } = props;


    const [newForm, setNewForm] = useState(existingForm);

    return (
        <div className="App">

            <div className="panel">
                <h2>Select Approach A</h2>


                <h3>Scenario 2 - A form with a id reference to object exists</h3>

                <p>This approach is well suited to this scenario</p>

                <SelectApproachA availableOptions={availableOptions} selectedOption={newForm.selectedFoo} onChange={(newValue) => {
                    setNewForm({ ...newForm, selectedFoo: newValue });
                }} label="Select Item" name="item"
                    generateLabelFn={(v) => v.foo}
                    generateValueFn={(v) => v.foo}
                />

                <pre>{JSON.stringify({ newForm }, null, 2)}</pre>

            </div>



        </div>);
};

export const ApproachAScenario3Demo = (props: {
    availableOptions: Array<{
        foo: string;
        bar: number
    }>;
}) => {
    const { availableOptions } = props;


    const [selectedOption, setSelectedOption] = useState(null as null | string)

    return (
        <div className="App">

            <div className="panel">
                <h2>Select Approach A</h2>


                <h3>Scenario 3 - Submitting a browser native form</h3>

                <p>Because we pass a name property, we can treat our component like a standard form</p>
                <p>One problem with this approach is that we need still need to manage the selected state of the component - we're not treating it as an uncontrolled component</p>

                <form onSubmit={(e) => {
                    e.preventDefault();

                    // I have to google this everytime I try to do this
                    // https://stackoverflow.com/questions/23427384/get-form-data-in-reactjs
                     
                    //@ts-ignore
                    const value = e.target["item"].value; 
                    alert(JSON.stringify({item:value}, null, 2)); 
                }}>
                    <SelectApproachA availableOptions={availableOptions} selectedOption={selectedOption} onChange={setSelectedOption} label="Select Item" name="item"
                        generateLabelFn={(v) => v.foo}
                        generateValueFn={(v) => v.foo}
                    />

                    <button type="submit">Submit Form</button>
                </form>


            </div>
        </div>);
};




