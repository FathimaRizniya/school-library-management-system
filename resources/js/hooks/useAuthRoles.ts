// utils/useAuthRoles.ts or hooks/useAuthRoles.ts

import { usePage } from '@inertiajs/react';

export function useAuthRoles() {
    const { auth } = usePage<{ props: { auth: { user: { roles: { name: string }[] } } } }>().props;
    const roles = auth.user.roles.map((role) => role.name);

    const hasRole = (roleName: string) => roles.includes(roleName);
    const hasAnyRole = (roleNames: string[]) => roleNames.some((r) => roles.includes(r));

    return {
        roles,
        hasRole,
        hasAnyRole,
    };
}
