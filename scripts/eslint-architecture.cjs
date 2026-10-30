const path = require('node:path');
const root = path.resolve(__dirname, '..', 'src');
module.exports = {
  rules: {
    boundaries: {
      meta: { type: 'problem', schema: [], messages: { boundary: '{{message}}' } },
      create(context) {
        const file = path.relative(root, context.filename).replaceAll('\\', '/');
        function check(node) {
          if (!node.source || typeof node.source.value !== 'string') return;
          const value = node.source.value;
          const target = value.startsWith('@/') ? value.slice(2) : value.startsWith('.') ?
            path.relative(root, path.resolve(path.dirname(context.filename), value)).replaceAll('\\', '/') : null;
          if (!target) return;
          let message;
          if (file.startsWith('shared/') && /^(features|entities|core|app)\//.test(target)) message = 'shared не может зависеть от верхних слоёв.';
          if (file.startsWith('entities/') && /^(features|core|app)\//.test(target)) message = 'entities может зависеть только от shared и entities.';
          const own = file.match(/^(features|entities)\/([^/]+)/)?.[0];
          const destination = target.match(/^(features|entities)\/([^/]+)/)?.[0];
          if (destination && own !== destination && target !== destination && target !== destination + '/index') message = 'Используйте публичный index.ts модуля ' + destination + '.';
          if (/^features\/rentals\/model\//.test(file) && !file.endsWith('rental-provider.tsx') && node.importKind !== 'type' &&
            (/^(react|react-native|expo)/.test(value) || /\/(api|components|screens|hooks)\//.test(target))) message = 'Чистая модель аренды не должна зависеть от UI, сети или хуков.';
          if (message) context.report({ node, messageId: 'boundary', data: { message } });
        }
        return { ImportDeclaration: check, ExportNamedDeclaration: check, ExportAllDeclaration: check };
      },
    },
  },
};

