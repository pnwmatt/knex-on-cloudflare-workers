"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDialectByNameOrAlias = getDialectByNameOrAlias;
var resolveClientNameWithAliases = require('../util/helpers').resolveClientNameWithAliases;
var dbNameToDialectLoader = Object.freeze({
    sqlite3: function () { return require('./sqlite3'); }
});
/**
 * Gets the Dialect object with the given client name or throw an
 * error if not found.
 *
 * NOTE: This is a replacement for prior practice of doing dynamic
 * string construction for imports of Dialect objects.
 */
function getDialectByNameOrAlias(clientName) {
    var resolvedClientName = resolveClientNameWithAliases(clientName);
    var dialectLoader = dbNameToDialectLoader[resolvedClientName];
    if (!dialectLoader) {
        throw new Error("Invalid clientName given: ".concat(clientName));
    }
    return dialectLoader();
}
//# sourceMappingURL=index.js.map