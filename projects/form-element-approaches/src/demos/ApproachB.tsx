/*
 * COPYRIGHT NOTICE
 * All source code contained within the Cydarm cybersecurity software provided by Cydarm
 * Technologies Pty Ltd ABN 17 622 236 113 (Company) is the copyright of the Company and
 * protected by copyright laws. Redistribution or reproduction of this material is strictly prohibited
 * without prior written permission of the Company. All rights reserved.
 */
import { RecordableHistogram } from 'perf_hooks';
import React, { useMemo, useState } from 'react';
import { SelectApproachB } from '../components/SelectApproachB/SelectApproachB';

export type ApproachADemoProps = {
    availableOptions: Array<{
        foo: string;
        bar: number
    }>;
};



export const ApproachBScenario1Demo = (props: ApproachADemoProps) => {
    const { availableOptions } = props;
    const [selectedOption, setSelectedOption] = useState(null as null | { foo: string; bar: number })

    return (
        <div className="App">

            <div className="panel">
                <h2>Select Approach B</h2>

                <p>Approach B is very similar to approach A, except that we pass a full object back, rather than just the 'value' of it</p>

                <p>This approach still requires a `generateValueFn` and so arguably we could just do a 'pass both the full value and the id value back' type approach</p>


                <h3>Scenario 1 - Parent wants the full selected object</h3>

                <p>This approach is well suited for this example </p>

                <SelectApproachB availableOptions={availableOptions} selectedOption={selectedOption} onChange={setSelectedOption} label="Select Item" name="item"
                    generateLabelFn={(v) => v.foo}
                    generateValueFn={(v) => v.foo}
                />

                <pre>{JSON.stringify( selectedOption , null, 2)}</pre>

            </div>



        </div>);
};


export const ApproachBScenario2Demo = (props: {
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

    const selectedItem = useMemo(() => {
        return availableOptions.find((v) => {
            return v.foo === newForm.selectedFoo;
        }) || null;
    }, [newForm, availableOptions]);

    return (
        <div className="App">

            <div className="panel">
                <h2>Select Approach B</h2>


                <h3>Scenario 2 - A form with a id reference to object exists</h3>

                <p>The problem with this approach is that we need to look up the full item each time we on change. (Or we need to seperately maintain the selection state, as well as the form state) </p>

                <SelectApproachB availableOptions={availableOptions} selectedOption={selectedItem} onChange={(newValue) => {
                    setNewForm({ ...newForm, selectedFoo: newValue.foo });
                }} label="Select Item" name="item"
                    generateLabelFn={(v) => v.foo}
                    generateValueFn={(v) => v.foo}
                />

                <pre>{JSON.stringify({ newForm }, null, 2)}</pre>

            </div>



        </div>);
};

export const ApproachBScenario3Demo = (props: {
    availableOptions: Array<{
        foo: string;
        bar: number
    }>;
}) => {
    const { availableOptions } = props;


    const [selectedOption, setSelectedOption] = useState(null as { foo: string; bar: number } | null)

    return (
        <div className="App">

            <div className="panel">
                <h2>Select Approach B</h2>


                <h3>Scenario 3 - Submitting a browser native form</h3>

                <p>Because we pass a name property, we can treat our component like a standard form</p>

                <p> This has the same problem of not behaving as an uncontrolled component</p>

                <form onSubmit={(e) => {
                    e.preventDefault();

                    // I have to google this everytime I try to do this
                    // https://stackoverflow.com/questions/23427384/get-form-data-in-reactjs

                    //@ts-ignore
                    const value = e.target["item"].value;
                    alert(JSON.stringify({ item: value }, null, 2));
                }}>
                    <SelectApproachB availableOptions={availableOptions} selectedOption={selectedOption} onChange={setSelectedOption} label="Select Item" name="item"
                        generateLabelFn={(v) => v.foo}
                        generateValueFn={(v) => v.foo}
                    />

                    <button type="submit">Submit Form</button>
                </form>


            </div>



        </div>);
};




