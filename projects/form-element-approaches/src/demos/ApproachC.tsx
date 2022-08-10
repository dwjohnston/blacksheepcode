
/*
 * COPYRIGHT NOTICE
 * All source code contained within the Cydarm cybersecurity software provided by Cydarm
 * Technologies Pty Ltd ABN 17 622 236 113 (Company) is the copyright of the Company and
 * protected by copyright laws. Redistribution or reproduction of this material is strictly prohibited
 * without prior written permission of the Company. All rights reserved.
 */
import { RecordableHistogram } from 'perf_hooks';
import React, { useMemo, useState } from 'react';
import { SelectApproachC } from '../components/SelectApproachC/SelectApproachC';

export type ApproachADemoProps = {
    availableOptions: Array<{
        foo: string;
        bar: number
    }>;
};



export const ApproachCScenario1Demo = (props: ApproachADemoProps) => {
    const { availableOptions } = props;
    const [selectedOption, setSelectedOption] = useState(null as null | { foo: string; bar: number })

    return (
        <div className="App">

            <div className="panel">
                <h2>Select Approach C</h2>

                <p>Approach C is a variation of Approach B, but we change it to fully uncontrolled component </p>

                <SelectApproachC availableOptions={availableOptions} defaultSelectedOption={selectedOption} onChange={setSelectedOption} label="Select Item" name="item"
                    generateLabelFn={(v) => v.foo}
                    generateValueFn={(v) => v.foo}
                />

                <pre>{JSON.stringify( selectedOption , null, 2)}</pre>

            </div>



        </div>);
};


export const ApproachCScenario2Demo = (props: {
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

    const initialSelectedItem = useMemo(() => {
        return availableOptions.find((v) => {
            return v.foo === existingForm.selectedFoo;
        }) || null;
    }, [existingForm, availableOptions]);

    return (
        <div className="App">

            <div className="panel">
                <h2>Select Approach C</h2>


                <h3>Scenario 2 - A form with a id reference to object exists</h3>

                <p>This is arguably an improvement on Approach B - where we still need to look up the full object, but we only need to do it for the first value </p>

                <SelectApproachC availableOptions={availableOptions} defaultSelectedOption={initialSelectedItem} onChange={(newValue) => {
                    setNewForm({ ...newForm, selectedFoo: newValue.foo });
                }} label="Select Item" name="item"
                    generateLabelFn={(v) => v.foo}
                    generateValueFn={(v) => v.foo}
                />

                <pre>{JSON.stringify({ newForm }, null, 2)}</pre>

            </div>



        </div>);
};

export const ApproachCScenario3Demo = (props: {
    availableOptions: Array<{
        foo: string;
        bar: number
    }>;
}) => {
    const { availableOptions } = props;

    return (
        <div className="App">

            <div className="panel">
                <h2>Select Approach C</h2>


                <h3>Scenario 3 - Submitting a browser native form</h3>

                <p>Here we demonstrate that we no longer need to use an onChange handler </p>

                <form onSubmit={(e) => {
                    e.preventDefault();

                    // I have to google this everytime I try to do this
                    // https://stackoverflow.com/questions/23427384/get-form-data-in-reactjs

                    //@ts-ignore
                    const value = e.target["item"].value;
                    alert(JSON.stringify({ item: value }, null, 2));
                }}>
                    <SelectApproachC availableOptions={availableOptions} defaultSelectedOption={null}  label="Select Item" name="item"
                        generateLabelFn={(v) => v.foo}
                        generateValueFn={(v) => v.foo}
                    />

                    <button type="submit">Submit Form</button>
                </form>


            </div>



        </div>);
};

export const ApproachCScenario4aDemo = (props: {
    availableOptions: Array<{
        foo: string;
        bar: number
    }>;
}) => {
    const { availableOptions } = props;

    const [selectedOption, setSelectedOption] = useState(availableOptions[0]); 

    return (
        <div className="App">

            <div className="panel">
                <h2>Select Approach C</h2>


                <h3>Scenario 4a - Controlling the component (Demonstration of the issue) </h3>

                <p>One potential problem with this approach is that is that it becomes a bit more complicated if you do want to contorl the selection state after the component has mounted   </p>

                <form onSubmit={(e) => {
                    e.preventDefault();

                    // I have to google this everytime I try to do this
                    // https://stackoverflow.com/questions/23427384/get-form-data-in-reactjs

                    //@ts-ignore
                    const value = e.target["item"].value;
                    alert(JSON.stringify({ item: value }, null, 2));
                }}>
                    <SelectApproachC availableOptions={availableOptions} defaultSelectedOption={selectedOption} onChange={setSelectedOption}  label="Select Item" name="item"
                        generateLabelFn={(v) => v.foo}
                        generateValueFn={(v) => v.foo}
                    />

                    <button type="submit">Submit Form</button>
                </form>

                <pre>{JSON.stringify({selectedOption}, null, 2)}</pre>
                <button onClick = {() => {
                    setSelectedOption(availableOptions[2]); 
                }}>Force Selection State To Option C</button>


            </div>



        </div>);
};





export const ApproachCScenario4bDemo = (props: {
    availableOptions: Array<{
        foo: string;
        bar: number
    }>;
}) => {
    const { availableOptions } = props;

    const [selectedOption, setSelectedOption] = useState(availableOptions[0]); 

    return (
        <div className="App">

            <div className="panel">
                <h2>Select Approach C</h2>


                <h3>Scenario 4a - Controlling the component (Solve via key) </h3>

                <p>We solve 4a by using a key, forcing the component to remount if selection changes. However, note that will forcably change the DOM - you may have performance issues with this approach  </p>

                <form onSubmit={(e) => {
                    e.preventDefault();

                    // I have to google this everytime I try to do this
                    // https://stackoverflow.com/questions/23427384/get-form-data-in-reactjs

                    //@ts-ignore
                    const value = e.target["item"].value;
                    alert(JSON.stringify({ item: value }, null, 2));
                }}>
                    <SelectApproachC key ={selectedOption.foo} availableOptions={availableOptions} defaultSelectedOption={selectedOption} onChange={setSelectedOption}  label="Select Item" name="item"
                        generateLabelFn={(v) => v.foo}
                        generateValueFn={(v) => v.foo}
                    />

                    <button type="submit">Submit Form</button>
                </form>

                <pre>{JSON.stringify({selectedOption}, null, 2)}</pre>
                <button onClick = {() => {
                    setSelectedOption(availableOptions[2]); 
                }}>Force Selection State To Option C</button>


            </div>



        </div>);
};

