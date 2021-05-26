import { not } from "logical-not";
import { ElementHandle, Page } from "puppeteer";

import { Selector, parse } from "./selector";

export function $(page: Page, selector: string): Promise<ElementHandle | null> {
    const parsedSelector = parse(selector);

    if (not(parsedSelector)) return Promise.resolve(null);

    return page
        .evaluateHandle((selectorSource: string) => {
            return query(JSON.parse(selectorSource) as Selector, document);

            function query(
                selector: Selector,
                context: Document | ShadowRoot,
            ): Element | null {
                const shadowRoot = context.querySelector(
                    selector.mainSelector,
                )?.shadowRoot;

                if (!shadowRoot) return null;

                if (typeof selector.shadowDOMSelector === "string")
                    return shadowRoot!.querySelector(
                        selector.shadowDOMSelector,
                    );
                else return query(selector.shadowDOMSelector, shadowRoot!);
            }
        }, JSON.stringify(parsedSelector))
        .then(source => source.asElement());
}
