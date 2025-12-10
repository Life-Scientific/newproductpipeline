"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { UserManagementData } from "@/lib/actions/user-management";

const UNASSIGNED_VALUE = "__unassigned__";

interface OwnerSelectorProps {
  users: UserManagementData[];
  selectedOwnerId: string | null;
  onOwnerChange: (ownerId: string | null) => void;
  className?: string;
  disabled?: boolean;
}

export function OwnerSelector({
  users,
  selectedOwnerId,
  onOwnerChange,
  className,
  disabled,
}: OwnerSelectorProps) {
  const selectedUser = users.find((u) => u.id === selectedOwnerId);
  const displayValue = selectedUser?.email || "Unassigned";

  return (
    <Select
      value={selectedOwnerId || UNASSIGNED_VALUE}
      onValueChange={(value) =>
        onOwnerChange(value === UNASSIGNED_VALUE ? null : value)
      }
      disabled={disabled}
    >
      <SelectTrigger className={className} disabled={disabled}>
        <SelectValue placeholder="Assign owner" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={UNASSIGNED_VALUE}>Unassigned</SelectItem>
        {users.map((user) => (
          <SelectItem key={user.id} value={user.id}>
            {user.email || "Unknown User"}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

