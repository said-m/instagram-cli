# @said-m/**instagram-post**

**Модуль** и **CLI** для вытягивания данных публикаций в **Instagram** без запросов к настоящей **API**-хе.

> Пока что, это пробная версия. Никаких SemVer-ов, SOLID-ных кодов.
> Только чистый говнокод на коленке.

## Установка / Installing

### CLI

```bash
npm install -g @said-m/instagram-cli
```

### NPM-module

```bash
yarn add @said-m/instagram-cli
```

## Использование / Usage

### CLI

```bash
instagram-cli -p $POST_KEY
```
or (w/o installation)
```bash
npx @said-m/instagram-cli -p $POST_KEY
```

> где `$POST_KEY` ищем в URI публикации так: instagram.com/p/`$POST_KEY`

### NPM-module

```ts
import { getPost } from '@said-m/instagram-cli';

const postKey: string = /* ... */;

try {
  const postData = await getPost(postKey);

  // Работа с результатом - `postData`.
} catch {
  // Обработка ошибки
}
```

> Интерфейс: `key` => Promise<[`PostInterface`](src/interfaces/post.ts) | `undefined`>.

## Лицензия / License

Данный проект распространяется по [**MIT License**](LICENSE).
