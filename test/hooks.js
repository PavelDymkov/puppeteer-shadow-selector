const puppeteer = require("puppeteer");
const { join } = require("path");

const url = `file://${join(__dirname, "index.html")}`;

globalThis.page = null;

let browser;

exports.mochaHooks = {
    async beforeAll() {
        browser = await puppeteer.launch();
    },

    async beforeEach() {
        page = await browser.newPage();

        await page.goto(url);
    },

    async afterEach() {
        await page.close();

        page = null;
    },

    async afterAll() {
        await browser.close();

        browser = null;
    },
};
