import React, { useRef, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Popper, Box, Typography, TextFieldProps } from "@mui/material";
import { Control, Controller, FieldValues, RegisterOptions, useFormState } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";

interface Props<T extends FieldValues> {
    control: Control<T>;
    name: keyof T;
    label: string;
    rules?: RegisterOptions;
}

function DatePickerWithTooltip<T extends FieldValues>({ control, name, label, rules }: Props<T>) {
    const anchorRef = useRef<HTMLDivElement | null>(null);
    const [focused, setFocused] = useState(false);
    const { errors, touchedFields, dirtyFields } = useFormState({ control });
    const hasError = !!errors[name];
    const isTouched = !!touchedFields[name as keyof typeof touchedFields];
    const isDirty = !!dirtyFields[name as keyof typeof dirtyFields];
    const isValid = !hasError && isTouched && isDirty;

    return (
        <Controller
            name={name as string}
            control={control as unknown as Control<FieldValues>}
            rules={rules}
            render={({ field }) => (
                <Box ref={anchorRef} sx={{ width: "100%", position: "relative" }}>
                    <DatePicker
                        label={label}
                        value={field.value ? dayjs(field.value as string) : null}
                        onChange={(date: Dayjs | null) => field.onChange(date ? date.format("YYYY-MM-DD") : null)}
                        slotProps={{
                            textField: {
                                fullWidth: true,
                                error: hasError,
                                onFocus: () => setFocused(true),
                                onBlur: () => {
                                    setFocused(false);
                                    field.onBlur();
                                },
                                sx: {
                                    "& .MuiOutlinedInput-root": {
                                        ...(hasError && {
                                            "& fieldset": { borderColor: "#f44336 !important" },
                                        }),
                                        ...(isValid && {
                                            "& fieldset": { borderColor: "green !important" },
                                        }),
                                    },
                                },
                            } as TextFieldProps,
                        }}
                        sx={{ width: "100%" }}
                    />

                    <Popper open={focused && hasError} anchorEl={anchorRef.current} placement="bottom-start">
                        <Box
                            sx={{
                                mt: 1,
                                px: 2,
                                py: 1,
                                backgroundColor: "#f44336",
                                color: "white",
                                borderRadius: 1,
                                fontSize: "0.75rem",
                                maxWidth: anchorRef.current?.clientWidth || 300,
                                width: "100%",
                            }}
                        >
                            <Typography variant="caption">{String(errors[name]?.message || "")}</Typography>
                        </Box>
                    </Popper>
                </Box>
            )}
        />
    );
}

export default DatePickerWithTooltip;
