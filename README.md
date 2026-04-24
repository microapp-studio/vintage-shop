# Maison Vintique — demo web app for small vintage shops

Это демо веб-приложение для маленького магазина: винтажная одежда, украшения, аксессуары, ресейл.

## Что внутри

- Главная страница с премиальной визуальной подачей
- Каталог товаров
- Фильтр по категориям
- Цены и статусы товаров
- Корзина заявки
- Форма заявки
- WhatsApp-ссылка с выбранными товарами
- Контакты и адрес
- Блок AI camera assistant: загрузка фото или камера телефона
- Демонстрационная генерация описания товара

## Как залить на GitHub Pages

1. Создать репозиторий на GitHub.
2. Загрузить файлы `index.html`, `styles.css`, `app.js`, `README.md`.
3. Открыть Settings → Pages.
4. Source: Deploy from branch.
5. Branch: main / root.
6. Сохранить.

Через минуту сайт появится по адресу вида:
`https://username.github.io/repository-name/`

## Как подключить email-заявки через Formspree

1. Зарегистрироваться на https://formspree.io/
2. Создать новую форму.
3. Скопировать endpoint вида:
`https://formspree.io/f/xxxxxxx`
4. В файле `index.html` найти строку:
`action="https://formspree.io/f/your-form-id"`
5. Заменить `your-form-id` на свой ID.
6. После этого заявки будут приходить на email.

## Почему Telegram нельзя подключать напрямую в app.js

Токен Telegram-бота нельзя хранить в открытом JavaScript-файле. GitHub Pages — статический хостинг, любой человек сможет открыть код и украсть токен.

Правильная схема:

- GitHub Pages: фронтенд
- Vercel / Netlify Functions / Cloudflare Workers: безопасная serverless-функция
- Telegram Bot API: отправка заявки в чат продавца

## Пример serverless-логики для Telegram

Фронтенд отправляет POST-запрос на безопасный endpoint:

```js
fetch('https://your-serverless-endpoint.example/send-order', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, phone, selectedItems, message })
});
```

Serverless-функция хранит `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID` в переменных окружения, а не в публичном коде.

## Реальный AI-анализ фото

В текущей версии AI-блок демонстрационный. Он показывает механику: фото + заметки → черновик описания.

Для настоящего анализа по изображению нужен серверный слой и vision API. Например:

- OpenAI Vision
- Google Vision
- Replicate / open-source vision models

Важно: для ювелирки, брендов и винтажа AI должен давать только предварительное описание. Нельзя обещать точное определение оригинальности, бренда или рыночной цены без эксперта.

## Как продавать этот шаблон на Upwork

Позиционирование:

> I build simple web apps for small shops: product catalogue, prices, contact forms, WhatsApp requests, and AI-assisted product descriptions.

Базовая услуга:

- Small shop web app
- Product catalogue
- Contact and request form
- WhatsApp button
- Mobile-first design
- GitHub Pages deployment

Дополнительные услуги:

- Email order form setup
- Telegram order notifications
- AI product description assistant
- Admin panel
- Online payments
