const path = require("path");

const resolvePath = (p) => path.resolve(__dirname, p);

module.exports = {
    // ...
    webpack: {
        alias: {
            "@components": resolvePath("./src/components"),
            "@styles": resolvePath("./src/assets/styles"),
            "@schemas": resolvePath("./src/db/schemas"),
            "@slices": resolvePath("./src/redux/slices"),
            "@thunks": resolvePath("./src/redux/thunks"),
            "@pages": resolvePath("./src/pages"),
            "@img": resolvePath("./src/assets/img"),
        },
    },
    // ...
};