import { useState } from "react";

export type Severity = "error" | "success" | "info" | "warning";

interface AlertDetails {
	text: string;
	visible: boolean;
	severity: Severity;
}

interface UseAlertReturnType {
	alertDetails: AlertDetails;
	showAlert: (text: string, severity?: Severity) => void;
	clearAlert: () => void;
}

export const useAlert = (
	defaultSeverity: Severity = "error"
): UseAlertReturnType => {
	const [alertDetails, setAlertDetails] = useState<AlertDetails>({
		text: "",
		visible: false,
		severity: defaultSeverity,
	});

	const showAlert = (text: string, severity: Severity = defaultSeverity) => {
		setAlertDetails({
			text,
			visible: true,
			severity,
		});

		setTimeout(() => {
			setAlertDetails({
				text: "",
				visible: false,
				severity: defaultSeverity,
			});
		}, 5000);
	};

	const clearAlert = () => {
		setAlertDetails({ text: "", visible: false, severity: "error" });
	};

	return {
		alertDetails,
		showAlert,
		clearAlert,
	};
};
