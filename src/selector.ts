export interface Selector {
    mainSelector: string;
    shadowDOMSelector: Selector | string;
}

export function parse(selector: string): Selector | null {
    selector = escapePartSelector(selector);

    const parsed = selector.match(/(.+?)::shadow-dom\((.+)\)/);

    if (parsed) {
        const [, mainSelector, shadowDOMSelector] = parsed;

        return {
            mainSelector,
            shadowDOMSelector: parse(shadowDOMSelector) || shadowDOMSelector,
        };
    }

    return null;
}

function escapePartSelector(source: string): string {
    const rexExp = /(.*?)::part\((.+?)\)(.*)/;

    return source.replace(rexExp, (_, selector, partName, rest) => {
        return `${selector}::shadow-dom([part="${partName}"]${
            rest ? escapePartSelector(rest) : ""
        })`;
    });
}
