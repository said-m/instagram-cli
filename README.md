# @said-m/**instagram-cli**

**Модуль** и **CLI** для вытягивания данных публикаций в **Instagram** без запросов к настоящей **API**-хе и авторизации.

[![npm version](https://badge.fury.io/js/%40said-m%2Finstagram-cli.svg)](https://badge.fury.io/js/%40said-m%2Finstagram-cli)
[![Build Status](https://travis-ci.com/said-m/instagram-cli.svg?branch=master)](https://travis-ci.com/said-m/instagram-cli)

## Установка / Installing

### CLI

```bash
npm install -g @said-m/instagram-cli
```

> Можно протестировать и без установки, см. [Использование](#Использование--Usage); \
> You can test it without installation, see [Usage](#Использование--Usage).

### NPM-module

```bash
yarn add @said-m/instagram-cli
```

## Использование / Usage

### CLI

```bash
instagram-cli $POST_KEY -p -m
```
or **(w/o installation)**:
```bash
npx @said-m/instagram-cli $POST_KEY -p -m
```

> где `$POST_KEY` ищем в URI публикации так: instagram.com/p/`$POST_KEY`

> Список доступных команд и их предназначение: [Методы](#Методы--Methods) \
> About flags, see [Methods](#Методы--Methods)

#### Интерактивный режим / Interactive

В данном режиме, скрипт будет поэтапно запрашивать данные в форме диалога.

```bash
instagram-cli $POST_KEY -i
```

### NPM-module

```ts
import { getPost } from '@said-m/instagram-cli';

const postKey: string = /* ... */;

const app = async () => {
  try {
    const postData = await getPost(postKey);

    // Работа с результатом - `postData`.
  } catch {
    // Обработка ошибки
  }
}

app();
```

> Интерфейс: `key` => Promise<[`PostInterface`] | `undefined`>.

## Методы / Methods

Список всех доступных флагов можно просмотреть в меню помощи:
```bash
instagram-cli -h
```

### Данные публикации / Post's data

Возвращает json-объект с основной информацией о файле.

#### CLI

Будет создан json-файл с указанным содержимым.

```bash
instagram-cli $POST_KEY -p
```

#### Module

Интерфейс возвращаемого объекта: [`PostInterface`].

```ts
import { getPost } from '@said-m/instagram-cli';

getPost(postKey).then(postData => {
  if (!postData) {
    console.error('Не удалось');
  }

  postData./* ... */;
});
```

### Медиа-файлы публикации / Media-files

#### CLI

Будет создана папка со всеми медиа-файлами публикации (изображения и видео).

```bash
instagram-cli $POST_KEY -m
```

#### Module

Интерфейс возвращаемого объекта: [`GetMediaOutputInterface`].

* **`byShortcode`**(name: `string`) => Promise<[`GetMediaOutputInterface`]>
  ```ts
  import { GetMedia } from '@said-m/instagram-cli';

  const getMedia = new GetMedia();
  const postKey:string = /* ... */;

  getMedia.byShortcode(postKey).then(media => {
    // Не удалось получить данные медиа
    if (!media) return;

    // Публикации могут содержиать несколько медиа
    media.forEach((thisMedia, thisMediaIndex) => {
      // Если не удалось получить файл
      if (!thisMedia) return;

      // Записываем в файл
      const fileName = thisMediaIndex + '.' + thisMedia.extension;
      thisMedia.stream.pipe(createWriteStream(fileName));
    });
  });
  ```
* **`byPostData`**(value: [`PostInterface`]) => [`GetMediaOutputInterface`] \
  Если данные поста уже загружены, то используем их, чтобы сэкономить трафик:
  ```ts
  // ...

  getPost(postKey).then(postData => {
    if (!postData) return;

    // Запрашиваем медиа по имеющимся данным публикации
    const media = getMedia.byPostData(postData);

    if (!media) return;

    media.forEach(/* ... */);
  });
  ```

## Лицензия / License

Данный проект распространяется по [**MIT License**](LICENSE).


[`PostInterface`]: src/lib/utils/interfaces/post.ts
[`GetMediaOutputInterface`]: src/lib/methods/utils/interfaces/get-media.ts
