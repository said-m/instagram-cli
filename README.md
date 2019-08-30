# @said-m/**instagram-post**

**Модуль** и **CLI** для вытягивания данных публикаций в **Instagram** без запросов к настоящей **API**-хе.

## Установка / Installing

### CLI

```bash
npm install -g @said-m/instagram-cli
```

> You can test it without installation, see [Usage](#%d0%98%d1%81%d0%bf%d0%be%d0%bb%d1%8c%d0%b7%d0%be%d0%b2%d0%b0%d0%bd%d0%b8%d0%b5--usage)

### NPM-module

```bash
yarn add @said-m/instagram-cli
```

## Использование / Usage

### CLI

```bash
instagram-cli -p $POST_KEY
```
or **(w/o installation)**:
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
