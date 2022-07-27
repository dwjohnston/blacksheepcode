
import React, { useMemo } from 'react';

export type SelectApproachBProps<T extends Record<string, unknown>> = {

    availableOptions: Array<T>;
    selectedOption: T | null;

    onChange: (value: T) => void;

    label: string;
    name: string;

    generateLabelFn: (value: T) => React.ReactNode;
    generateValueFn: (value: T) => string;

};



export const SelectApproachB = <T extends Record<string, unknown>>(props: SelectApproachBProps<T>) => {
    const {
        availableOptions,
        selectedOption,
        onChange,
        label,
        name,
        generateLabelFn,
        generateValueFn

    } = props;


    const valueLookup = useMemo(() => {
        return availableOptions.reduce((acc, cur) => {

            const value = generateValueFn(cur);
            return {

                ...acc,
                [value]: cur
            };
        }, {} as Record<string, T>);
    }, [availableOptions, generateValueFn]);


    return (
        <label> {label}
            <select value={selectedOption ? generateValueFn(selectedOption) : ""} name={name} onChange={(e) => {
                const value = e.target.value; 
                const fullValue = valueLookup[value]; 
                onChange(fullValue);
            }}>


                <option value="" disabled>(None Selected)</option>
                {availableOptions.map((v) => {
                    const optionLabel = generateLabelFn(v);
                    const optionValue = generateValueFn(v);
                    return <option key={optionValue} value={optionValue}> {optionLabel} </option>
                })}
            </select>
        </label>


    );
};
