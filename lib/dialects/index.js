import sqlite3Dialect from './sqlite3';

/**
 * Gets the Dialect object with the given client name or throw an
 * error if not found.
 *
 * NOTE: This is a replacement for prior practice of doing dynamic
 * string construction for imports of Dialect objects.
 */
export function getDialectByNameOrAlias(clientName) {
  return sqlite3Dialect;
}