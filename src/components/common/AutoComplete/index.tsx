/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FocusEventHandler, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { AutocompleteChangeReason, AutocompleteChangeDetails } from '@mui/material/Autocomplete';

export interface Option {
    value: string;
    label: string;
    otherValue?: string;
    default_search?: boolean;
    disabled?: boolean; // Add disabled property to Option interface
}

interface SelectProps {
    options: Option[];
    label: string;
    isMultiSelect: boolean;
    defaultValue?: string | string[];
    onChange: (value: string | string[]) => void;
    onBlur?: FocusEventHandler<HTMLDivElement>;
    disabled: boolean;
    width?: number | string;
    disableClearable?: boolean;
}

export default function AutoCompleteComponent({
    options,
    label,
    defaultValue,
    onChange,
    disabled,
    width,
    isMultiSelect,
    onBlur,
    disableClearable,
}: SelectProps) {
    const [value, setValue] = useState<string | string[]>(defaultValue || '');

    useEffect(() => {
        setValue(defaultValue || null);
    }, [defaultValue]);

    const handleChange = (
        event: React.SyntheticEvent<Element, Event>,
        newValue: Option | Option[] | null,
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<Option> | undefined,
    ) => {
        if (!newValue) {
            setValue(null);
            onChange(null);
            return;
        }
        if (Array.isArray(newValue)) {
            const selectedValues = newValue.map((option) => option.value);
            setValue(selectedValues);
            onChange(selectedValues);
        } else {
            const selectedValue = newValue.value;
            setValue(selectedValue);
            onChange(selectedValue);
        }
    };

    const handleEnterKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    };

    const getOptionDisabled = (option: Option) => option.disabled;

    const renderOption = (props: React.HTMLAttributes<HTMLLIElement>, option: Option) => {
        return (
            <li
                {...props}
                style={{
                    ...props.style,
                    //backgroundColor: option.disabled ? '#f2f2f2' : 'transparent', // Customize disabled option background color
                    opacity: option.disabled ? 0.5 : 'none',
                }}
            >
                {option.label}
            </li>
        );
    };

    return (
        <Autocomplete
            multiple={isMultiSelect}
            value={
                isMultiSelect
                    ? options?.filter((option) => (value as string[])?.includes(option.value))
                    : options?.find((option) => option.value === value) || null
            }
            onChange={handleChange}
            id="AutoCompleteComponent"
            options={options}
            getOptionLabel={(option: Option) => option.label}
            sx={{ width: width }}
            renderInput={(params) => <TextField {...params} label={label} />}
            disabled={disabled}
            onKeyDown={handleEnterKeyPress}
            onBlur={onBlur}
            openOnFocus
            disableCloseOnSelect={isMultiSelect}
            data-testid={label}
            disableClearable={disableClearable}
            getOptionDisabled={getOptionDisabled} // Disable options based on the disabled property
            renderOption={renderOption}
        />
    );
}
