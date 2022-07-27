
import React from 'react';

export type SelectApproachAProps<T extends Record<string, unknown>> = {

    availableOptions: Array<T>;
    selectedOption: string | null;

    onChange: (value: string) => void;

    label: string;
    name: string;

    generateLabelFn: (value: T) => React.ReactNode;
    generateValueFn: (value: T) => string;

};



export const SelectApproachA = <T extends Record<string, unknown>>(props: SelectApproachAProps<T>) => {
    const {
        availableOptions,
        selectedOption,
        onChange,
        label,
        name,
        generateLabelFn,
        generateValueFn

    } = props;


    return (
        <label> {label}
            <select value={selectedOption || ""} onChange={(e) => {
                onChange(e.target.value);
            }} name={name}>


                <option value ="" disabled>(None Selected)</option>
                {availableOptions.map((v) => {
                    const optionLabel = generateLabelFn(v);
                    const optionValue = generateValueFn(v);

                    return <option key={optionValue} value={optionValue}> {optionLabel} </option>
                })}
            </select>
        </label>


    );
};
