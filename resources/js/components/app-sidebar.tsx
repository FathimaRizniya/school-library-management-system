
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { ArrowDownRight, Banknote, Bell, BookOpen, Folder, FolderArchive, LayoutGrid, Tags, User, Users } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/lib/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Users',
        url: '/lib/users',
        icon: User,
    },
    {
        title: 'Students',
        url: '/lib/students',
        icon: Users,
    },
    {
        title: 'Books',
        url: '/lib/books',
        icon: BookOpen,
    },
    {
        title: 'Categories',
        url: '/lib/categories',
        icon: Tags,
    },
    {
        title: 'Transactions',
        url: '/lib/transactions',
        icon: Folder,
    },
    {
        title: 'Fines',
        url: '/lib/fines',
        icon: Banknote,
    },
    {
        title: 'Requested Books',
        url: '/lib/requested-books',
        icon: ArrowDownRight,
    },






];

const studentNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/stu/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Books',
        url: '/stu/books',
        icon: BookOpen,
    },
    {
        title: 'Requested Books',
        url: '/stu/books/requested',
        icon: BookOpen,
    },
    {
        title: 'Transactions',
        url: '/stu/transactions',
        icon: Folder,
    },
    {
        title: 'Fines',
        url: '/stu/fines',
        icon: FolderArchive,
    },
];

export function AppSidebar() {
    const { auth } = usePage<{ props: { auth: { user: { roles: { name: string }[] } } } }>().props;
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <div>
                                <AppLogo />
                           </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {auth && auth.user.roles.some((role: { name: string }) => role.name === 'librarian') ? (
                    <NavMain items={mainNavItems} />
                ) : (
                    <NavMain items={studentNavItems} />
                )}
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
