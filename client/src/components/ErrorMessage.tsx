import { Alert } from "@mui/material";

interface ErrorMessageProps {
	text: string;
	visible: boolean;
	severity: "error" | "warning" | "info" | "success";
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
	text,
	visible,
	severity,
}) => {
	return visible && <Alert severity={severity}>{text}</Alert>;
};

export default ErrorMessage;

export type Severity = "error" | "warning" | "info";
