/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Form } from 'react-bootstrap';
import { ErrorMessage } from 'formik';
import { InputAdornment, TextField } from '@mui/material';

const ReactstrapFormikInput = ({ field: { ...fields }, form: { touched, errors, setFieldValue }, ...props }: any) => {
    const { id, maxLength, endText, trimValue, isFilterError, colorCode, ...rest } = props;

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        const trimmedValue = trimValue ? value.trim() : value;
        if (props.onChange) {
            props.onChange({ target: { name, value: trimmedValue } });
            return;
        }
        if (fields.onChange) {
            fields.onChange({ target: { name, value: trimmedValue } });
            return;
        }
    };

    return (
        <Form.Group controlId={id}>
            <div>
                <TextField
                    {...fields}
                    {...rest}
                    onChange={handleChange}
                    multiline={props.type === 'textarea'} // Set multiline to true for textarea
                    rows={props.rows || 6} // Specify the number of rows for the textarea
                    inputProps={{ maxLength: maxLength || 200 }} //to set maxlength
                    InputProps={{ endAdornment: <InputAdornment position="end">{endText}</InputAdornment> }}
                />
            </div>
            <ErrorMessage name={fields.name}>
                {(msg) => {
                    return msg !== 'required' ? (
                        <div className="field-error" style={isFilterError ? { marginTop: '-20px' } : {}}>
                            {msg}
                        </div>
                    ) : (
                        ''
                    );
                }}
            </ErrorMessage>
        </Form.Group>
    );
};
export default ReactstrapFormikInput;
