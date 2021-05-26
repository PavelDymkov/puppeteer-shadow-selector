module.exports = {
    spec: ["test/run.test.js"],
    parallel: false,
    require: ["test/hooks.js"],
    globals: ["page"],
};
