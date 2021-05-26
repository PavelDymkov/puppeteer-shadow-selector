const { $ } = require("../lib");
const { checkTextContent } = require("./tools");
const { strictEqual: equal, notStrictEqual: notEqual } = require("assert");

it("case 1", async () => {
    const element = await $(page, `my-component::part(text)`);

    await checkTextContent(element, "MyComponent: Text 2");
});

it("case 2", async () => {
    const element = await $(page, `my-component::shadow-dom([part=text])`);

    await checkTextContent(element, "MyComponent: Text 2");
});

it("case 3", async () => {
    const element = await $(page, `my-component::shadow-dom(div > div)`);

    await checkTextContent(element, "MyComponent: Text 1");
});

it("case 4", async () => {
    const element = await $(
        page,
        `my-component::shadow-dom(inner-component::shadow-dom(.text-2))`,
    );

    await checkTextContent(element, "InnerComponent: Text 2");
});

it("case 5", async () => {
    const element = await $(
        page,
        `my-component::shadow-dom(inner-component::part(text-3))`,
    );

    await checkTextContent(element, "InnerComponent: Text 3");
});

it("case 6 (with delay)", async () => {
    const element = await $(page, `.delay my-component::part(text)`);

    await checkTextContent(element, "MyComponent: Text 2");
});

it("case 7", async () => {
    const element = await $(page, `my-component`);

    notEqual(element, null);
});

it("case 8", async () => {
    const element = await $(page, `my-component::part(not-exists)`);

    equal(element, null);
});
