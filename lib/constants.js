// The client names we'll allow in the `{name: lib}` pairing.
const CLIENT_ALIASES = Object.freeze({
  sqlite: 'sqlite3',
});

const SUPPORTED_CLIENTS = Object.freeze(
  [
    'sqlite3',
  ].concat(Object.keys(CLIENT_ALIASES))
);

const DRIVER_NAMES = Object.freeze({
  SQLite: 'sqlite3',
});

const POOL_CONFIG_OPTIONS = Object.freeze([
  'maxWaitingClients',
  'testOnBorrow',
  'fifo',
  'priorityRange',
  'autostart',
  'evictionRunIntervalMillis',
  'numTestsPerRun',
  'softIdleTimeoutMillis',
  'Promise',
]);

/**
 * Regex that only matches comma's in strings that aren't wrapped in parentheses. Can be used to
 * safely split strings like `id int, name string, body text, primary key (id, name)` into definition
 * rows
 */
const COMMA_NO_PAREN_REGEX = /,[\s](?![^(]*\))/g;

module.exports = {
  CLIENT_ALIASES,
  SUPPORTED_CLIENTS,
  POOL_CONFIG_OPTIONS,
  COMMA_NO_PAREN_REGEX,
  DRIVER_NAMES,
};
