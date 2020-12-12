export const groupBy = <TItem, TValue extends { toString(): string }>(xs: TItem[], key: (item: TItem) => TValue) => {

    const result: { [state: string]: TItem[] } = {};

    return xs.reduce(function (rv: { [state: string]: TItem[] }, x: TItem) {
        const keyValue = key(x).toString();
        const group = rv[keyValue] = rv[keyValue] || [];

        group.push(x);

        return rv;
    }, result);
};
