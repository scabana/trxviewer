export const groupBy = <TItem>(xs: TItem[], key: (item: TItem) => string) => {

	const result: { [state: string]: TItem[] } = {};

	return xs.reduce(function (rv: { [state: string]: TItem[] }, x: TItem) {
		const group = rv[key(x)] = rv[key(x)] || [];

		group.push(x);

		return rv;
	}, result);
};