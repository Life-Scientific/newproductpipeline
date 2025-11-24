# Launch Preparation Checklist

## ✅ Completed

### Code Organization
- [x] Broke up large `queries.ts` file (2034 lines → multiple domain-specific modules)
  - `types.ts` - Shared types
  - `ingredients.ts` - Ingredient queries
  - `countries.ts` - Country/exchange rate queries
  - `cogs.ts` - COGS queries
  - `use-groups.ts` - Use group queries
  - `portfolio.ts` - Portfolio/pipeline queries
  - `queries.ts` - Still contains formulations & business-cases (can be split further)

### User Management & Roles
- [x] Implemented role-based access control (RBAC)
  - Viewer role (read-only)
  - Editor role (can edit data)
  - Admin role (can manage users + all data)
- [x] User roles stored in database with RLS policies
- [x] JWT integration (roles in access tokens via auth hook)
- [x] User management UI in Settings page
- [x] Server actions for role management

### Database Migrations
- [x] User roles system migration
- [x] Admin role migration (ready to run)

## 🔄 In Progress / To Do

### Database Setup
- [ ] Run migration: `20251124000000_add_admin_role.sql`
- [ ] Assign admin role to initial admin user(s)
- [ ] Enable auth hook in Supabase Dashboard:
  - Go to: Authentication > Hooks (Beta) > Custom Access Token Hook
  - Select: `public.custom_access_token_hook`

### Testing
- [ ] Test role permissions:
  - [ ] Viewer can only read
  - [ ] Editor can edit data
  - [ ] Admin can manage users and all data
- [ ] Test user management UI
- [ ] Test JWT token includes role claim
- [ ] Test RLS policies work correctly

### Security Review
- [ ] Verify RLS policies are properly configured
- [ ] Verify admin role can't be removed if last admin
- [ ] Verify editor/admin role can't be removed if last one
- [ ] Review auth hook security

### Documentation
- [ ] Document role permissions
- [ ] Document how to assign roles
- [ ] Document auth hook setup

### Performance
- [ ] Verify queries are optimized
- [ ] Check database indexes
- [ ] Monitor query performance

### Deployment
- [ ] Run all migrations on production
- [ ] Set up initial admin user
- [ ] Enable auth hook in production
- [ ] Verify production environment variables
- [ ] Test production deployment

## 📋 Pre-Launch Tasks

### Environment Setup
- [ ] Verify all environment variables are set
- [ ] Verify Supabase connection strings
- [ ] Verify API keys are secure

### Data Migration (if needed)
- [ ] Export any existing data
- [ ] Verify data integrity
- [ ] Test data import/export

### Monitoring & Logging
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Set up application monitoring
- [ ] Set up database monitoring
- [ ] Configure log levels

### Backup & Recovery
- [ ] Set up database backups
- [ ] Test backup restoration
- [ ] Document recovery procedures

## 🚀 Launch Day

### Pre-Launch
- [ ] Final code review
- [ ] Run all tests
- [ ] Check for console errors
- [ ] Verify all pages load correctly
- [ ] Test authentication flow
- [ ] Test role-based access

### Post-Launch
- [ ] Monitor error logs
- [ ] Monitor user signups
- [ ] Verify email confirmations work
- [ ] Check performance metrics
- [ ] Gather user feedback

## 📝 Notes

### Current Status
- Code refactoring: ✅ Complete
- User roles: ✅ Complete (admin role migration ready)
- Database migrations: ⚠️ Need to run admin role migration
- Auth hook: ⚠️ Need to enable in Supabase Dashboard

### Next Steps
1. Run the admin role migration
2. Assign admin role to initial user(s)
3. Enable auth hook in Supabase Dashboard
4. Test all role permissions
5. Final security review
6. Deploy to production

