# Git Workflow Guide

**Simple, clear instructions for working with branches and making changes.**

---

## 🎯 The Golden Rule

**One branch = One thing you're trying to do**

When you're done, merge it and delete the branch. That's it!

---

## 📋 Quick Start (Copy-Paste Friendly)

### Starting a New Feature/Fix

```bash
# 1. Make sure you're on main and it's up to date
git checkout main
git pull origin main

# 2. Create a new branch with a descriptive name
git checkout -b feature/add-business-case-filters
# OR for a bug fix:
git checkout -b fix/business-case-modal-not-closing

# 3. Make your changes (code, test, vibe)
# ... do your work ...

# 4. Commit your changes
git add .
git commit -m "Add filters to business case page"

# 5. Push your branch
git push origin feature/add-business-case-filters

# 6. Create a Pull Request on GitHub
# (GitHub will show you a link after pushing)
```

### After Your PR is Merged

```bash
# 1. Go back to main
git checkout main

# 2. Pull the latest changes (including your merge)
git pull origin main

# 3. Delete your local branch (it's been merged, you don't need it)
git branch -d feature/add-business-case-filters

# 4. Delete the remote branch too (optional, but keeps things clean)
git push origin --delete feature/add-business-case-filters
```

---

## 🌿 Branch Naming Convention

**Format**: `type/descriptive-name`

### Types:
- `feature/` - New functionality (e.g., `feature/add-export-button`)
- `fix/` - Bug fixes (e.g., `fix/login-error-message`)
- `refactor/` - Code improvements without changing behavior (e.g., `refactor/simplify-form-validation`)
- `style/` - UI/design changes (e.g., `style/update-button-colors`)
- `docs/` - Documentation updates (e.g., `docs/add-setup-instructions`)

### Good Names:
- ✅ `feature/business-case-filters`
- ✅ `fix/modal-not-closing`
- ✅ `refactor/form-validation`
- ✅ `style/dashboard-spacing`

### Bad Names:
- ❌ `jack-branch` (not descriptive)
- ❌ `test` (too vague)
- ❌ `fix` (what are you fixing?)
- ❌ `new-feature` (what feature?)

---

## 🔄 Daily Workflow

### Morning Routine

```bash
# Start fresh each day
git checkout main
git pull origin main
```

### Working on Something

```bash
# Create a branch for what you're doing
git checkout -b feature/your-thing

# Make changes, commit often
git add .
git commit -m "Describe what you did"

# Push when ready for review
git push origin feature/your-thing
```

### Switching Between Tasks

```bash
# Save your current work
git add .
git commit -m "WIP: working on filters"

# Switch to another branch
git checkout main
git checkout -b fix/urgent-bug

# When done, switch back
git checkout feature/your-thing
```

---

## 🚫 What NOT to Do

### ❌ Don't Commit Directly to `main`
Always create a branch, even for tiny changes.

### ❌ Don't Keep Branches Forever
Delete them after they're merged. They're just temporary.

### ❌ Don't Use Your Name in Branch Names
Use what you're building, not who you are.

### ❌ Don't Merge Your Own PRs (Usually)
Let someone else review it first. Fresh eyes catch bugs.

---

## ✅ Best Practices

### Commit Often
Small commits are easier to understand and review:
```bash
git commit -m "Add filter dropdown component"
git commit -m "Wire up filter state to table"
git commit -m "Add filter reset button"
```

### Write Clear Commit Messages
- ✅ "Add export button to business cases table"
- ✅ "Fix modal closing when clicking outside"
- ❌ "fix stuff"
- ❌ "changes"

### Keep Branches Small
One feature per branch. If you're doing multiple things, make multiple branches.

### Test Before Pushing
```bash
# Make sure it runs
pnpm dev

# Check for errors
pnpm lint

# Then push
git push origin feature/your-thing
```

---

## 🔀 Handling Conflicts

Sometimes someone else changed the same file you did:

```bash
# 1. Make sure your branch is up to date
git checkout main
git pull origin main

# 2. Go back to your branch
git checkout feature/your-thing

# 3. Merge main into your branch
git merge main

# 4. Git will tell you if there are conflicts
# Look for files marked with "CONFLICT"

# 5. Open those files and look for:
<<<<<<< HEAD
Your changes
=======
Their changes
>>>>>>> main

# 6. Keep what you need, delete the conflict markers
# (Or ask for help if you're stuck!)

# 7. Mark conflicts as resolved
git add .
git commit -m "Resolve merge conflicts"

# 8. Push again
git push origin feature/your-thing
```

---

## 🆘 Common Problems & Solutions

### "I'm on the wrong branch!"
```bash
# See what branch you're on
git branch

# Switch to main
git checkout main

# Create a new branch
git checkout -b feature/your-thing
```

### "I committed to main by accident!"
```bash
# Create a branch from your current position
git checkout -b feature/your-thing

# Reset main to where it was before
git checkout main
git reset --hard origin/main
```

### "I want to undo my last commit"
```bash
# Undo the commit but keep your changes
git reset --soft HEAD~1

# Or undo everything (be careful!)
git reset --hard HEAD~1
```

### "I pushed the wrong thing"
```bash
# Fix it locally first
git reset HEAD~1  # or however many commits

# Force push (only if you're the only one on the branch!)
git push --force origin feature/your-thing
```

---

## 📚 More Help

- **Git Basics**: [GitHub's Git Handbook](https://guides.github.com/introduction/git-handbook/)
- **Pull Requests**: [GitHub's PR Guide](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests)
- **Ask the Team**: If you're stuck, ask! We've all been there.

---

## 🎓 Quick Reference Card

```bash
# Start new work
git checkout main && git pull
git checkout -b feature/name

# Save work
git add . && git commit -m "message"
git push origin feature/name

# After merge
git checkout main && git pull
git branch -d feature/name
```

---

**Remember**: Branches are temporary. Create, use, merge, delete. Keep it simple! 🎉

