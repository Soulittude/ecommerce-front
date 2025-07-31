# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

```
ecommerce-front
├─ .husky
│  ├─ pre-commit
│  └─ _
│     ├─ applypatch-msg
│     ├─ commit-msg
│     ├─ h
│     ├─ husky.sh
│     ├─ post-applypatch
│     ├─ post-checkout
│     ├─ post-commit
│     ├─ post-merge
│     ├─ post-rewrite
│     ├─ pre-applypatch
│     ├─ pre-auto-gc
│     ├─ pre-commit
│     ├─ pre-merge-commit
│     ├─ pre-push
│     ├─ pre-rebase
│     └─ prepare-commit-msg
├─ components.json
├─ eslint.config.js
├─ index.html
├─ jsconfig.json
├─ package-lock.json
├─ package.json
├─ public
│  └─ vite.svg
├─ README.md
├─ src
│  ├─ api
│  │  ├─ apiClient.js
│  │  ├─ auth.js
│  │  ├─ categories.js
│  │  ├─ orders.js
│  │  ├─ products.js
│  │  └─ reviews.js
│  ├─ App.css
│  ├─ App.jsx
│  ├─ assets
│  │  └─ react.svg
│  ├─ components
│  │  ├─ ProductCard.jsx
│  │  └─ ui
│  │     ├─ button.jsx
│  │     └─ navbar.jsx
│  ├─ hooks
│  │  └─ queries.js
│  ├─ i18n
│  │  ├─ en.json
│  │  └─ tr.json
│  ├─ i18n.js
│  ├─ index.css
│  ├─ lib
│  │  └─ utils.js
│  ├─ main.jsx
│  ├─ pages
│  │  ├─ Cart.jsx
│  │  └─ Home.jsx
│  ├─ routes.jsx
│  └─ store
│     ├─ authSlice.js
│     ├─ cartSlice.js
│     ├─ index.js
│     └─ orderSlice.js
└─ vite.config.js

```

```
ecommerce-front
├─ .husky
│  ├─ pre-commit
│  └─ _
│     ├─ applypatch-msg
│     ├─ commit-msg
│     ├─ h
│     ├─ husky.sh
│     ├─ post-applypatch
│     ├─ post-checkout
│     ├─ post-commit
│     ├─ post-merge
│     ├─ post-rewrite
│     ├─ pre-applypatch
│     ├─ pre-auto-gc
│     ├─ pre-commit
│     ├─ pre-merge-commit
│     ├─ pre-push
│     ├─ pre-rebase
│     └─ prepare-commit-msg
├─ .roomodes
├─ components.json
├─ eslint.config.js
├─ index.html
├─ jsconfig.json
├─ lib
│  └─ utils.js
├─ memory-bank
├─ package-lock.json
├─ package.json
├─ public
│  └─ vite.svg
├─ README.md
├─ src
│  ├─ api
│  │  ├─ apiClient.js
│  │  ├─ auth.js
│  │  ├─ categories.js
│  │  ├─ orders.js
│  │  ├─ products.js
│  │  └─ reviews.js
│  ├─ App.css
│  ├─ App.jsx
│  ├─ assets
│  │  └─ react.svg
│  ├─ components
│  │  ├─ Categories.jsx
│  │  ├─ HeroCarousel.jsx
│  │  ├─ NavBar.jsx
│  │  ├─ ProductCard.jsx
│  │  ├─ ReviewForm.jsx
│  │  ├─ ReviewList.jsx
│  │  └─ ui
│  │     ├─ accordion.jsx
│  │     ├─ alert-dialog.jsx
│  │     ├─ alert.jsx
│  │     ├─ avatar.jsx
│  │     ├─ badge.jsx
│  │     ├─ button.jsx
│  │     ├─ card.jsx
│  │     ├─ carousel.jsx
│  │     ├─ checkbox.jsx
│  │     ├─ dialog.jsx
│  │     ├─ dropdown-menu.jsx
│  │     ├─ form.jsx
│  │     ├─ input.jsx
│  │     ├─ label.jsx
│  │     ├─ navigation-menu.jsx
│  │     ├─ popover.jsx
│  │     ├─ radio-group.jsx
│  │     ├─ select.jsx
│  │     ├─ skeleton.jsx
│  │     ├─ sonner.jsx
│  │     ├─ switch.jsx
│  │     ├─ table.jsx
│  │     ├─ tabs.jsx
│  │     ├─ textarea.jsx
│  │     └─ tooltip.jsx
│  ├─ hooks
│  │  └─ queries.js
│  ├─ i18n
│  │  ├─ en.json
│  │  └─ tr.json
│  ├─ i18n.js
│  ├─ index.css
│  ├─ lib
│  │  └─ utils.js
│  ├─ main.jsx
│  ├─ pages
│  │  ├─ AuthPage.jsx
│  │  ├─ Cart.jsx
│  │  ├─ Home.jsx
│  │  ├─ OrderConfirmation.jsx
│  │  ├─ Product.jsx
│  │  └─ SearchPage.jsx
│  ├─ routes.jsx
│  └─ store
│     ├─ authSlice.js
│     ├─ cartSlice.js
│     ├─ index.js
│     └─ orderSlice.js
└─ vite.config.js

```
