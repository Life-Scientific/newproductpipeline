# Life Scientific Portfolio Management System

A Next.js application for managing agrochemical formulation portfolios through their entire lifecycle - from concept to market launch to commercialization.

---

## 🚀 Quick Start for New Team Members

This guide will help you get the project running on your computer so you can make UI changes using Cursor.

### Step 1: Install Required Software

Before starting, you need to install these tools on your Mac:

#### 1.1 Install Homebrew (Package Manager)

Open **Terminal** (press `Cmd + Space`, type "Terminal", press Enter) and paste:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Follow the prompts. When done, close and reopen Terminal.

#### 1.2 Install Node.js and pnpm

In Terminal, run these commands one at a time:

```bash
# Install Node.js (required to run the app)
brew install node

# Install pnpm (our package manager - faster than npm)
brew install pnpm
```

#### 1.3 Install Git

```bash
brew install git
```

#### 1.4 Install Cursor

Download Cursor from [cursor.com](https://cursor.com) and install it like any Mac app.

### Step 2: Clone the Repository

This downloads the project code to your computer.

1. Open Terminal
2. Navigate to where you want the project (e.g., Documents):
   ```bash
   cd ~/Documents
   ```
3. Clone the repository:
   ```bash
   git clone https://github.com/jackoregankenny/newproductpipeline.git
   ```
4. Enter the project folder:
   ```bash
   cd newproductpipeline
   ```

### Step 3: Set Up Environment Variables

The app needs some configuration to connect to the database.

1. Create a file called `.env.local` in the project root:
   ```bash
   touch .env.local
   ```

2. Open the project in Cursor:
   ```bash
   cursor .
   ```

3. In Cursor, find and open `.env.local` in the file explorer (left sidebar)

4. Add these lines:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://phizaaaxgbvgcaojiyow.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBoaXphYWF4Z2J2Z2Nhb2ppeW93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzNzQ1MTEsImV4cCI6MjA3Nzk1MDUxMX0.X1n9jLnq5PtXBvu758G9_G6u6bR2L3K-PJVitDHGiH0
   ```

5. Save the file (`Cmd + S`)

### Step 4: Install Dependencies

In Terminal (make sure you're in the project folder), run:

```bash
pnpm install
```

This downloads all the libraries the project needs. It might take a minute or two.

### Step 5: Run the Development Server

```bash
pnpm dev
```

You should see output like:
```
▲ Next.js 16.0.1
- Local:        http://localhost:3000
```

**Open your browser and go to** [http://localhost:3000](http://localhost:3000)

You should see the login page!

### Step 6: Start Making Changes

Now you're ready to edit the UI using Cursor!

---

## 📁 Project Structure (What's Where)

```
newproductpipeline/
├── src/                          # All source code
│   ├── app/                      # Pages and routes
│   │   ├── (auth)/               # Login, signup pages
│   │   ├── (dashboard)/          # Main app pages
│   │   │   ├── page.tsx          # Dashboard homepage
│   │   │   ├── formulations/     # Formulations pages
│   │   │   ├── business-cases/   # Business cases pages
│   │   │   └── ...               # Other pages
│   │   └── globals.css           # Global styles
│   │
│   ├── components/               # Reusable UI pieces
│   │   ├── ui/                   # Basic components (buttons, cards, etc.)
│   │   ├── layout/               # Page layouts, sidebars
│   │   ├── forms/                # Form components
│   │   ├── formulations/         # Formulation-specific components
│   │   └── ...                   # Other component groups
│   │
│   └── lib/                      # Utilities and data fetching
│       ├── db/                   # Database queries
│       ├── actions/              # Server actions (form submissions)
│       └── supabase/             # Database client setup
│
├── public/                       # Static files (images, etc.)
├── supabase/                     # Database configuration
│   └── migrations/               # Database schema changes
├── docs/                         # Documentation
└── package.json                  # Project dependencies
```

### Key Folders for UI Editing

| If you want to change... | Look in... |
|--------------------------|------------|
| A page's layout/content | `src/app/(dashboard)/[page-name]/page.tsx` |
| A specific component | `src/components/[category]/[ComponentName].tsx` |
| Colors, fonts, spacing | `src/app/globals.css` |
| Buttons, cards, inputs | `src/components/ui/` |

---

## 🎨 Using Cursor to Edit the UI

### Basic Workflow

1. **Open the project** in Cursor
2. **Run the dev server** in Terminal (`pnpm dev`)
3. **Find the file** you want to change in the file explorer
4. **Make your change** (edit the code directly or ask Cursor's AI)
5. **Save the file** (`Cmd + S`)
6. **Check the browser** - changes appear automatically!

### Using Cursor's AI Assistant

Cursor has a built-in AI that can help you make changes. Here's how to use it:

#### Method 1: Chat (Cmd + L)
- Press `Cmd + L` to open the chat panel
- Describe what you want to change
- Example: "Change the dashboard title to 'Portfolio Overview'"

#### Method 2: Inline Edit (Cmd + K)
- Select some code
- Press `Cmd + K`
- Describe the change you want
- Example: "Make this button blue instead of green"

#### Method 3: Composer (Cmd + I)
- Press `Cmd + I` for multi-file changes
- Describe what you want to build or change
- The AI will suggest changes across multiple files

### Tips for Good Prompts

**Be specific:**
- ❌ "Make it look better"
- ✅ "Increase the padding on this card from 4 to 6"

**Reference what you see:**
- ❌ "Change the color"
- ✅ "Change the MetricCard title color to blue"

**Ask for one thing at a time:**
- ❌ "Redesign the whole page"
- ✅ "Add a subtitle under the page title"

---

## 🔧 Common Tasks

### Viewing Your Changes

Changes appear automatically in the browser when you save a file. If they don't:
1. Check the Terminal for errors (red text)
2. Try refreshing the browser (`Cmd + R`)
3. Restart the dev server (see below)

### Restarting the Dev Server

If something seems broken:
1. Go to Terminal
2. Press `Ctrl + C` to stop the server
3. Run `pnpm dev` again

### Checking for Errors

#### In Terminal
Look for red text or errors. Common ones:
- "Module not found" - a file path is wrong
- "Syntax error" - there's a typo in the code

#### In Cursor
Cursor shows errors with red squiggly lines under the code. Hover over them to see what's wrong.

### Formatting Code

Keep code tidy by running:
```bash
pnpm format
```

Or in Cursor: `Cmd + Shift + P` → type "Format Document" → Enter

### Checking Code Quality

```bash
pnpm lint
```

This checks for common problems in the code.

---

## 🛡️ Important Rules

### DO ✅

- Edit files in `src/components/` and `src/app/`
- Ask questions if you're unsure
- Make small, focused changes
- Test your changes in the browser

### DON'T ❌

- **Don't modify files in `supabase/migrations/`** - these are database changes that need coordination
- Don't delete files unless you're sure they're unused
- Don't change `package.json` without asking
- **Don't commit directly to `main` branch** - always create a branch first (see [Git Workflow](./docs/workflow/GIT_WORKFLOW.md))

---

## 📖 Additional Documentation

More detailed documentation is in the `docs/` folder:

### Getting Started
| Document | Description |
|----------|-------------|
| [Git Workflow](./docs/workflow/GIT_WORKFLOW.md) | **Start here!** How to create branches, make changes, and submit PRs |
| [SETUP.md](./docs/SETUP.md) | Original setup notes |
| [PRODUCT_CONTEXT.md](./docs/PRODUCT_CONTEXT.md) | What this app does and who uses it |

### Development Guides
| Document | Description |
|----------|-------------|
| [DESIGN_SYSTEM.md](./docs/DESIGN_SYSTEM.md) | Spacing, typography, component patterns |
| [SCHEMA_MIGRATION.md](./docs/SCHEMA_MIGRATION.md) | Database field naming conventions |
| [SUPABASE_LOCAL_DEVELOPMENT.md](./docs/SUPABASE_LOCAL_DEVELOPMENT.md) | Supabase database setup and migrations |

### Planning & Improvements
| Document | Description |
|----------|-------------|
| [Overhaul Plans](./docs/overhaul/) | Technical improvement plans and optimizations |

---

## 🆘 Getting Help

### If the app won't start:
1. Make sure you're in the right folder (`cd newproductpipeline`)
2. Run `pnpm install` again
3. Check `.env.local` exists and has the correct content
4. Restart your Terminal

### If you see errors:
1. Read the error message - it often tells you what's wrong
2. Check if you have unsaved changes (`Cmd + S`)
3. Try restarting the dev server

### If you're stuck:
1. Ask Cursor's AI for help (describe the error)
2. Ask a team member
3. Check the documentation in `docs/`

---

## 🛠️ Tech Stack Reference

This project uses:

| Technology | What it does |
|------------|--------------|
| **Next.js 16** | React framework for building the app |
| **React 19** | UI library for components |
| **TypeScript** | JavaScript with types (helps catch errors) |
| **Tailwind CSS v4** | Utility classes for styling |
| **shadcn/ui** | Pre-built component library |
| **Supabase** | Database and authentication |
| **Biome** | Code formatting and linting |
| **Framer Motion** | Animations |

---

## 📝 Scripts Reference

Run these in Terminal from the project folder:

| Command | What it does |
|---------|--------------|
| `pnpm dev` | Start the development server |
| `pnpm build` | Build for production (checks for errors) |
| `pnpm lint` | Check code for problems |
| `pnpm format` | Auto-format code |

---

Happy coding! 🎉
