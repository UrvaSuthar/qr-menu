# GitHub Repository Setup Checklist

Since some repository settings cannot be configured via code, please log in to GitHub and complete the following steps to fully polish your open-source project.

## 1. General Settings
- [x] **About Section**: Click the ⚙️ icon next to "About" on the main code page.
  - **Description**: "A modern, QR-based restaurant menu platform built with Next.js 14 and Supabase."
  - **Website**: Add your Vercel deployment URL (if you have one).
  - **Topics**: Add `nextjs`, `supabase`, `react`, `typescript`, `tailwindcss`, `open-source`.
  - **checkbox**: Ensure "Include in the home page" is checked.

- [x] **Social Preview**: Go to **Settings** > **General** > **Social preview**.
  - Upload an image (1280x640) that represents your project (e.g., a screenshot of the dashboard).

- [x] **Features**: Go to **Settings** > **General**.
  - [x] **Wikis**: Enable if you plan to write extensive documentation (optional).
  - [x] **Issues**: Ensure this is enabled.
  - [x] **Discussions**: Enable this if you want a forum for general questions/ideas separate from bug reports.

## 2. Branch Protection (Crucial for Open Source)
Protect your code integrity by preventing direct pushes to `main`.

Go to **Settings** > **Branches** > **Add branch protection rule**.
- **Branch name pattern**: `main`
- [x] **Require a pull request before merging**
  - [x] Require approvals (Keep unchecked or set to 0 for solo dev, 1 for strict review).
- [x] **Require status checks to pass before merging** (Search for `Vercel` once your first deployment runs).
- [x] **Do not allow bypassing this rule** (keeps even admins safe).

## 3. Community Standards
Go to **Insights** > **Community Standards**.
- [x] Verify that GitHub detects your:
  - Description
  - README
  - Code of Conduct
  - Contributing Guidelines
  - License
  - Issue Templates
  - Pull Request Template

## 4. Security
Go to **Settings** > **Code security and analysis**.
- [x] **Dependabot alerts**: Enable.
- [x] **Dependabot security updates**: Enable (this will auto-create PRs to fix vulnerable dependencies).
- [x] **Secret scanning**: Enable (alerts you if you accidentally commit API keys).
- [x] **Dependabot version updates**: Enabled via `.github/dependabot.yml` (Weekly npm updates).

## 5. Merge Options
Go to **Settings** > **General** > **Pull Requests**.
- [x] **Allow merge commits**: Recommended (`true`).
- [x] **Allow squash merging**: Recommended (`true`) - great for keeping history clean.
- [x] **Allow rebase merging**: Optional.
- [x] **Automatically delete head branches**: Recommended (`true`) - keeps your repo clean after merges.

## 6. Advanced Setup (Fun & Useful Extras) 🚀
These steps make your repository feel like a verified, high-quality open source project.

- [ ] **Pin the Welcome Discussion**:
   1. Go to **Discussions** tab.
   2. Create a new "General" or "Announcement" discussion.
   3. Copy content from `docs/COMMUNITY_WELCOME.md`.
   4. After posting, scroll to the bottom right of your post and click **Pin discussion**.
   5. This becomes the specific "landing page" for community members.

- [ ] **Create Your First Release**:
   1. Go to the main **Code** page -> Look for "Releases" on the right sidebar.
   2. Click **Create a new release**.
   3. **Choose a tag**: `v0.1.0`.
   4. **Target**: `main`.
   5. **Release title**: "Initial Open Source Release 🎉".
   6. **Description**: Click the "Generate release notes" button (GitHub AI will summarize your recent PRs) or write a short "We are live!" message.
   7. Click **Publish release**.


