const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function() {
    ac.grant("basic")
        .readOwn("profile")
        .updateOwn("profile")
        .create("comment")
        .readAny("homePage")
    ac.grant("shop_owner")
        .extend("basic")
        .readAny("profile")
        .readAny("comment")
        .createOwn("product")
        .updateOwn("product")
        .deleteOwn("product")
        .create("shop")
        .updateOwn("shop")
        .createOwn("homePage")
        .readOwn("product")


    ac.grant("admin")
        .extend("basic")
        .extend("shop_owner")
        .updateAny("profile")
        .deleteAny("profile")
        .readAny("comment")
        .deleteAny("comment")
        .deleteAny("shop")


    return ac;
})();