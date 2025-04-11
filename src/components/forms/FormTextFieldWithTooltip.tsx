import React from "react";
import { TextField, styled } from "@mui/material";
import { Controller, Control, FieldValues, RegisterOptions, useFormState, Path } from "react-hook-form";
import FormErrorTooltip from "./FormErrorTooltip";

const StyledTextField = styled(TextField)({});

interface Props<T extends FieldValues> {
    name: keyof T;
    control: Control<T>;
    label: string;
    rules?: RegisterOptions;
    multiline?: number;
}

function FormTextFieldWithTooltip<T extends FieldValues>({ name, control, label, rules, multiline }: Props<T>) {
    const { errors, touchedFields, dirtyFields } = useFormState({ control });

    const error = !!errors[name];
    const touched = touchedFields[name as keyof typeof touchedFields];
    const dirty = dirtyFields[name as keyof typeof dirtyFields];
    const success = touched && dirty && !error;
    console.log("success", success, name);
    return (
        <Controller
            name={name as Path<T>}
            control={control}
            rules={rules as Omit<RegisterOptions<T, Path<T>>, "disabled" | "setValueAs" | "valueAsNumber" | "valueAsDate"> | undefined}
            render={({ field }) => (
                <FormErrorTooltip errorMessage={(errors[name]?.message as string) || ""}>
                    <StyledTextField
                        fullWidth
                        label={label}
                        {...field}
                        error={error}
                        onBlur={field.onBlur}
                        variant="outlined"
                        multiline={multiline ? true : false}
                        rows={multiline ? multiline : 1}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    ...(error && { borderColor: "red !important" }),
                                    ...(success && { borderColor: "green ! important" }),
                                },   
                            },
                            "& .MuiFormLabel-root": {
                                ...(success && {
                                  color: "green !important",
                                }),
                              },
                        }}
                    />
                </FormErrorTooltip>
            )}
        />
    );
}

export default FormTextFieldWithTooltip;
