# User Invitation System

This document describes the user invitation system that allows editors and admins to invite new users via email.

## Overview

The invitation system allows editors and admins to:
- Send email invitations to new users
- Assign roles (viewer, editor, admin) during invitation
- Track invitation status (pending, accepted, expired)
- Resend or cancel invitations

## Setup

### Environment Variables

Add the following environment variable to your `.env.local`:

```bash
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

You can find your service role key in the Supabase Dashboard:
1. Go to Project Settings → API
2. Copy the `service_role` key (keep this secret!)

**Important**: Never expose the service role key to the client. It bypasses Row Level Security.

### Database Migration

Run the migration to create the invitations table:

```bash
# Apply the migration
supabase migration up
# Or manually run the SQL file
psql $DATABASE_URL -f supabase/migrations/20251125000000_create_invitations_system.sql
```

## How It Works

### Invitation Flow

1. **Editor/Admin sends invitation**:
   - Navigate to Settings → Users & Roles
   - Click "Invite User"
   - Enter email and select role
   - Click "Send Invitation"

2. **User receives email**:
   - Supabase sends an invitation email with a verification link
   - The link points to `/accept-invite`

3. **User accepts invitation**:
   - User clicks the link in the email
   - They verify their email and set a password
   - Database trigger automatically assigns the role from the invitation
   - User is redirected to the dashboard

### Database Triggers

The system uses a database trigger (`handle_new_user`) that:
- Automatically assigns the role from a pending invitation when a user signs up
- Falls back to "viewer" role if no invitation is found
- Marks the invitation as accepted

## Features

### Invite User Modal

Located in `src/components/settings/InviteUserModal.tsx`:
- Email input validation
- Role selection (viewer, editor, admin)
- Error handling and success notifications

### User Management Page

Located in `src/components/settings/UserManagement.tsx`:
- **Users Tab**: Shows all existing users with their roles
- **Invitations Tab**: Shows all invitations with status
  - Pending invitations can be resent or cancelled
  - Accepted/expired invitations are shown for reference

### Server Actions

Located in `src/lib/actions/user-management.ts`:

- `inviteUserByEmail(email, role, redirectTo?)`: Send an invitation
- `getAllInvitations()`: Get all invitations (editor only)
- `resendInvitation(invitationId)`: Resend a pending invitation
- `cancelInvitation(invitationId)`: Cancel a pending invitation
- `markInvitationAsAccepted(userEmail, userId)`: Mark invitation as accepted (called automatically)

## API Reference

### inviteUserByEmail

```typescript
await inviteUserByEmail(
  "user@example.com",
  "editor", // or "viewer" | "admin"
  "https://yourapp.com/accept-invite" // optional redirect URL
);
```

### Resend Invitation

```typescript
await resendInvitation(invitationId);
```

### Cancel Invitation

```typescript
await cancelInvitation(invitationId);
```

## Security

- Only editors and admins can send invitations
- Invitations expire after 7 days
- Service role key is only used server-side
- Row Level Security (RLS) protects the invitations table
- Roles are assigned automatically via database triggers

## Email Templates

Supabase handles email templates. You can customize them in:
- Supabase Dashboard → Authentication → Email Templates
- Or via `supabase/config.toml` for local development

The invite email template uses these variables:
- `{{ .ConfirmationURL }}`: The verification link
- `{{ .Email }}`: The invited user's email
- `{{ .SiteURL }}`: Your application URL

## Troubleshooting

### Invitation email not sent

1. Check that `SUPABASE_SERVICE_ROLE_KEY` is set correctly
2. Verify email is not already a user
3. Check Supabase Dashboard → Authentication → Users for errors
4. Check email rate limits in Supabase Dashboard

### Role not assigned after signup

1. Check that the invitation exists and is not expired
2. Verify the database trigger is active
3. Check database logs for trigger errors
4. Manually assign role via User Management page if needed

### User can't accept invitation

1. Check that the invitation link is not expired (7 days)
2. Verify the token_hash matches
3. Check browser console for errors
4. Try resending the invitation

## Future Enhancements

Potential improvements:
- Bulk invitations via CSV upload
- Custom invitation messages
- Invitation analytics (acceptance rates, etc.)
- Workspace-specific invitations
- Invitation reminders

