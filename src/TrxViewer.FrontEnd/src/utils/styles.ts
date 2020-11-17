export let getStyle = (outcome: string) => {
	if (outcome == "Passed") {
		return { color: "var(--green, green)" };
	}
	if (outcome == "Failed") {
		return { color: "var(--red, red)" };
	}
}