# puppeteer-shadow-selector

`puppeteer-shadow-selector` helps to select elements in Shadow DOM.

```html
<!DOCTYPE html>
<html>
    <body>
        <my-component>
            #shadow-root (open)
            <div>
                <input part="text" />
            </div>
        </my-component>
    </body>
</html>
```

```js
import * as puppeteer from "puppeteer";
import { $ } from "puppeteer-shadow-selector";

async function example() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("http://localhost");

    const input = await $(page, `my-component::part(text)`);
    // or await $(page, `my-component::shadow-dom([part="text"])`);
    // or await $(page, `my-component::shadow-dom(input)`);

    if (input) await input.type("Hello, World!");
}
example();
```
