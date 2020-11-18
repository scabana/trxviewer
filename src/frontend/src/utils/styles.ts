export let getStyle = (outcome: string) => {
	if (outcome == "Passed") {
		return { color: "var(--green, green)" };
	}
	if (outcome == "Failed") {
		return { color: "var(--red, red)" };
	}
}

export function normalizeColor(color: string | any) {
	if (typeof color != "string") {
		return color;
	}

	if (color.startsWith("rgba")) {

		let content = (/rgba\((?<content>.+)\)/.exec(color) as any).groups.content;
		let newContent = content.split(",").splice(0, 3).join(",");

		return `rgb(${newContent})`;
	}

	return color;
}