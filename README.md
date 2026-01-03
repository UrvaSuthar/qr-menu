# QR Menu Platform

![License](https://img.shields.io/github/license/UrvaSuthar/qr-menu)
![Issues](https://img.shields.io/github/issues/UrvaSuthar/qr-menu)
![Pull Requests](https://img.shields.io/github/issues-pr/UrvaSuthar/qr-menu)
![Last Commit](https://img.shields.io/github/last-commit/UrvaSuthar/qr-menu)

A modern, QR-based restaurant menu platform built with Next.js 14 and Supabase. This solution allows restaurants and food courts to easily manage their menus and allows customers to view them by simply scanning a QR code.

## 🚀 Features

- **Authentication**: Secure email/password signup with role selection (Restaurant, Food Court, Customer)
- **Role-Based Dashboards**: tailored interfaces for single restaurants vs multi-vendor food courts
- **Real-time Updates**: Instant menu updates using Supabase real-time capabilities
- **Responsive Design**: Mobile-first approach optimized for all devices
- **Secure**: Row Level Security (RLS) enabled for data protection

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Supabase (Auth, PostgreSQL, Storage)
- **Deployment**: Vercel

## 🏁 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account (free tier)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/UrvaSuthar/qr-menu.git
   cd qr-menu
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   
   Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
   fill in your Supabase credentials in `.env.local`.

4. **Set up Supabase Database**
   - Create a new Supabase project
   - Run the SQL migrations found in `supabase/migrations/`
   - Enable Row Level Security (RLS)

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](docs/CONTRIBUTING.md) for details on how to get started.

- Please adhere to our [Code of Conduct](docs/CODE_OF_CONDUCT.md).
- For security issues, please see our [Security Policy](docs/SECURITY.md).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
