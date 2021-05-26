const { strictEqual: equal } = require("assert");

exports.checkTextContent = async function (element, expect) {
    const textContent = await element.getProperty("textContent");
    const actual = await textContent.jsonValue();

    equal(actual, expect);
};
