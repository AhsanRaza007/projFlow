import React, { useState, cloneElement, ReactElement } from "react";
import { styled, Tooltip, tooltipClasses, TooltipProps } from "@mui/material";

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => <Tooltip {...props} classes={{ popper: className }} />)(() => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "#d32f2f",
        color: "#fff",
        fontSize: "0.875rem",
        padding: "10px 12px",
        borderRadius: "8px",
        boxSizing: "border-box",
        width: "100%",
        maxWidth: "100%",
        whiteSpace: "normal",
    },
    [`& .${tooltipClasses.arrow}`]: {
        color: "#d32f2f",
    },
}));

interface FormErrorTooltipProps {
    errorMessage?: string;
    children: ReactElement<{ onFocus?: () => void; onBlur?: () => void }>;
}

const FormErrorTooltip: React.FC<FormErrorTooltipProps> = ({ errorMessage, children }) => {
    const [isFocused, setIsFocused] = useState(false);

    const showError = !!errorMessage && isFocused;

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const childWithHandlers = cloneElement(children, {
        onFocus: (...args: Parameters<NonNullable<typeof children.props.onFocus>>) => {
            handleFocus();
            if (children.props.onFocus) children.props.onFocus(...args);
        },
        onBlur: (...args: Parameters<NonNullable<typeof children.props.onBlur>>) => {
            handleBlur();
            if (children.props.onBlur) children.props.onBlur(...args);
        },
    });

    return (
        <div style={{ display: "inline-block", width: "100%" }}>
            <StyledTooltip title={errorMessage ?? ""} 
            arrow 
            open={showError} 
            disableHoverListener 
            disableTouchListener 
            disableFocusListener
            placement="auto-start"
            >
                <span style={{ display: "inline-block", width: "100%" }}>{childWithHandlers}</span>
            </StyledTooltip>
        </div>
    );
};

export default FormErrorTooltip;
