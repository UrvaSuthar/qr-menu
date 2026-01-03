# Contributing to QR Menu Platform

Thank you for your interest in contributing to QR Menu Platform! We welcome contributions from the community.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

This project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/qr-menu.git`
3. Add upstream remote: `git remote add upstream https://github.com/urvasuthar/qr-menu.git`

## Development Setup

### Prerequisites

- Node.js 18+ and npm
- Supabase account (free tier)
- Git

### Recommended Dev Tools (Optional)
- **Git Clients**: 
  - [Lazygit](https://github.com/jesseduffield/lazygit) (Terminal UI - Highly Recommended 🚀)
  - [GitKraken](https://www.gitkraken.com/) or [SourceTree](https://www.sourcetreeapp.com/) (GUI)
- **Editor**: VS Code with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` with your Supabase credentials.

3. Set up Supabase:
   - Create a new Supabase project
   - Run migrations from `supabase/migrations/` folder
   - Enable Row Level Security (RLS)

4. Start development server:
   ```bash
   npm run dev
   ```

## How to Contribute

### Reporting Bugs

- Use the GitHub issue tracker
- Check if the bug has already been reported
- Use the bug report template
- Include detailed steps to reproduce
- Include environment information

### Suggesting Features

- Use the GitHub issue tracker
- Use the feature request template
- Clearly describe the use case
- Explain why this feature would be useful

### Code Contributions

1. **Find an issue** to work on or create a new one
2. **Comment** on the issue to let others know you're working on it
3. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Avoid `any` types; use proper typing
- Use interfaces for object shapes
- Export types that are used in multiple files

### React/Next.js

- Use functional components with hooks
- Follow the App Router conventions
- Keep components focused and reusable
- Use proper file naming: `ComponentName.tsx`

### Styling

- Use Tailwind CSS utility classes
- Follow the existing design system
- Ensure responsive design (mobile-first)
- Test on different screen sizes

### Code Quality

- Write clean, readable code
- Add comments for complex logic
- Remove console.logs before committing
- Handle errors appropriately
- Follow existing patterns in the codebase

## Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(menu): add menu item filtering
fix(auth): resolve login redirect issue
docs(readme): update installation instructions
```

## Pull Request Process

1. **Update your branch** with the latest changes from `main`:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Test your changes**:
   ```bash
   npm run build
   npm run lint
   ```

3. **Push to your fork**:
   ```bash
   git push origin your-branch-name
   ```

4. **Create a Pull Request**:
   - Use the PR template
   - Link related issues
   - Provide a clear description
   - Add screenshots for UI changes
   - Ensure all checks pass

5. **Code Review**:
   - Address review comments
   - Push additional commits if needed
   - Keep the conversation focused and professional

6. **Merge**:
   - Maintainers will merge once approved
   - Your branch will be deleted after merge

## Questions?

Feel free to open an issue for any questions or reach out to the maintainers.

Thank you for contributing! 🎉
