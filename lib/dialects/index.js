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
import { resolveClientNameWithAliases } from '../util/helpers';
import sqlite3Dialect from './sqlite3';

const dbNameToDialectLoader = Object.freeze({
  sqlite3: sqlite3Dialect
});

/**
 * Gets the Dialect object with the given client name or throw an
 * error if not found.
 *
 * NOTE: This is a replacement for prior practice of doing dynamic
 * string construction for imports of Dialect objects.
 */
export function getDialectByNameOrAlias(clientName) {
  const resolvedClientName = resolveClientNameWithAliases(clientName);
  const dialect = dbNameToDialectLoader[resolvedClientName];
  if (!dialect) {
    throw new Error(`Invalid clientName given: ${clientName}`);
  }
  return dialect;
}
//# sourceMappingURL=index.js.map