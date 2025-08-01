import Knex from 'knex';
import type { PluginOption } from 'vite';

const dialects = {
  sqlite3: Knex({ client: 'sqlite3' })
};

export default function knexDialects(): PluginOption {
  const regex = /<SqlOutput[\s]*code="([^"]+)"[\s]*\/>/gi;

  return {
    name: 'transform-file',
    enforce: 'pre',

    transform(src, id) {
      if (id.endsWith('.md')) {
        const matches = src.matchAll(regex);
        for (const match of matches) {
          let markdown = '';
          const getCode = Function('knex', `return knex.raw(${match[1]});`);

          for (const dialect in dialects) {
            const knex = dialects[dialect];
            const { sql } = getCode(knex);
            const output = sql.toString();

            markdown += `<div data-dialect="${dialect}">\n\n\`\`\`sql\n${output}\n\`\`\`\n\n</div>\n`;
          }

          src = src.replace(match[0], markdown);
        }
      }

      return src;
    },
  };
}
