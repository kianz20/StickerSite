import { Alert } from "@mui/material";

interface AlertMessageProps {
	text: string;
	visible: boolean;
	severity: "error" | "warning" | "info" | "success";
}

const AlertMessage: React.FC<AlertMessageProps> = ({
	text,
	visible,
	severity,
}) => {
	return visible && <Alert severity={severity}>{text}</Alert>;
};

export default AlertMessage;

export type Severity = "error" | "warning" | "info" | "success";
