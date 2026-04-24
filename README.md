# Maison Archive — Vintage Shop Mobile Web App

A mobile-first web app demo for small vintage shops.

## Features

- English interface
- Mobile-first storefront
- Product catalog
- Category filters
- Product cards with price, tags and description
- Request bag / cart
- Customer request form
- WhatsApp contact link with selected items
- Camera / image upload field
- Demo AI item note generator
- GitHub Pages ready

## Important

This is a static front-end demo.

It does not include:

- real online payments
- real AI vision analysis
- real email sending
- admin panel
- backend database

For a real client project, you can connect:

- Stripe or PayPal for payments
- Formspree / Netlify Forms / backend API for orders
- OpenAI Vision API or another image model for real photo analysis
- Firebase / Supabase for products and admin panel
- Telegram bot via a serverless function

## How to publish on GitHub Pages

1. Create a new GitHub repository.
2. Upload these files:
   - index.html
   - styles.css
   - app.js
   - README.md
3. Go to repository Settings.
4. Open Pages.
5. Choose the main branch and root folder.
6. Save.

Your app will be available at:

```text
https://your-username.github.io/repository-name/
```

## How to connect Formspree

1. Create a form at https://formspree.io
2. Replace the form tag in index.html:

```html
<form class="order-form" id="orderForm">
```

with:

```html
<form class="order-form" id="orderForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

3. In app.js, remove or rewrite the current demo submit handler if you want the browser to submit directly to Formspree.

## How to connect Telegram safely

Do not put a Telegram bot token inside app.js.

Use one of these:

- Vercel Serverless Function
- Netlify Function
- Cloudflare Worker
- your own backend

The frontend sends order data to your serverless endpoint.
The serverless endpoint sends the message to Telegram using the hidden bot token.

## Demo positioning for freelance platforms

You can describe this project as:

> Mobile-first storefront for small vintage shops with product catalog, request bag, customer inquiry form, WhatsApp contact and AI-assisted product description draft.

Good for:

- vintage shops
- thrift stores
- handmade jewelry sellers
- small boutiques
- Instagram sellers
- pop-up stores
