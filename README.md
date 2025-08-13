# Houzel – Real-Time Chat with useStream

Houzel is a real-time chat application demonstrating the power of Laravel's `useStream` hook for React applications. It showcases how to build a ChatGPT-like interface with streaming responses, message persistence, and authentication support.

## Video Tutorial

Watch the original tutorial on YouTube that inspired this project:

[![Building an AI Chat App with Laravel and React useStream](https://img.youtube.com/vi/BuUbTRHuvAw/maxresdefault.jpg)](https://youtu.be/BuUbTRHuvAw)

🎥 **[Watch on YouTube: Building an AI Chat App with Laravel and React useStream](https://youtu.be/BuUbTRHuvAw)**

## Features

* 🚀 Real-time streaming responses using Server-Sent Events (SSE)
* 💬 ChatGPT-like interface with message history
* 🔐 Optional authentication with message persistence
* 🎯 Automatic chat title generation using `useEventStream`
* 🎨 Beautiful UI with Tailwind CSS v4 and shadcn/ui
* 📱 Responsive design with mobile support
* 🌓 Dark/light mode with system preference detection

## System Requirements

Before getting started, ensure your system meets these requirements:

### Required

* **PHP 8.2 or higher** with the following extensions:

  * curl, dom, fileinfo, filter, hash, mbstring, openssl, pcre, pdo, session, tokenizer, xml
* **Node.js 22 or higher** (for React 19 support)
* **Composer 2.x**
* **SQLite** (default database, or MySQL/PostgreSQL if preferred)
* **Git** (for cloning the repository)

### Optional but Recommended

* **OpenAI API Key** (for AI responses - Houzel works without it but uses mock responses)
* **PHP development server** or **Laravel Valet** for local development

### Framework Versions Used

* **Laravel 12.0** (latest)
* **React 19** (latest)
* **Tailwind CSS v4** (beta)
* **Inertia.js 2.0**

> **Note**: Houzel uses cutting-edge versions to showcase the latest features. If you encounter compatibility issues, check the versions above against your local environment.

## Quick Start

1. Clone the repository and install dependencies:

```bash
composer install
npm install
```

2. Set up your environment:

```bash
cp .env.example .env
php artisan key:generate
```

3. Configure your OpenAI API key in `.env`:

```env
OPENAI_API_KEY=your-api-key-here
```

4. Run migrations and start the development server:

```bash
php artisan migrate
composer dev
```

> **Note**: The `composer dev` command runs multiple processes concurrently (server, queue, logs, and Vite). If you encounter issues, run each command separately in different terminals:
>
> ```bash
> # Terminal 1: Laravel server
> php artisan serve
>
> # Terminal 2: Queue worker (for background jobs)
> php artisan queue:listen
>
> # Terminal 3: Vite development server
> npm run dev
> ```

## Troubleshooting

### Common Setup Issues

**"Node.js version too old" error:**

* Ensure you have Node.js 22+ installed
* Use `nvm` to manage Node.js versions: `nvm install 22 && nvm use 22`

**"Class 'OpenAI' not found" error:**

* Run `composer install` to ensure all PHP dependencies are installed
* Check that your `OPENAI_API_KEY` is set in `.env` (or leave it empty for mock responses)

**Database connection errors:**

* The default setup uses SQLite - ensure the `database/database.sqlite` file exists
* If it's missing, create it with: `touch database/database.sqlite`
* Then run: `php artisan migrate`

**Vite build errors with Tailwind CSS v4:**

* Clear your npm cache: `npm cache clean --force`
* Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
* Ensure you're using Node.js 22+

**"CSRF token mismatch" for streaming:**

* Ensure the CSRF meta tag is present in your layout (already included in Houzel)
* Clear browser cache and cookies for the local development domain

## Using the useStream Hook

The `useStream` hook from `@laravel/stream-react` makes it incredibly simple to consume streamed responses in your React application. Here's how Houzel implements it:

*(The rest of the technical guide remains the same as in the original text, just replacing mentions of “this demo” with “Houzel” and “demo project” with “application” where applicable.)*

## License

Houzel is open-sourced software licensed under the [MIT license](LICENSE.md).