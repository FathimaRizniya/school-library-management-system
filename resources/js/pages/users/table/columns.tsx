import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User } from "@/types";
import { Link, useForm, usePage } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table"
import { link } from "fs";


export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone_number",
    header: "Phone Number",
    },

  {
    header: 'Role',
        cell: ({ row }) => {
          const roles = row.original.roles as { name: string }[];

          return (
              <>
                  {roles.map((role: { name: string }, index: number) => (
                      <Badge key={index} variant="secondary" className="mr-2">
                          {role.name}
                      </Badge>
                  ))}
              </>
          );
        },
  },
  {
          id: 'actions',
          cell: ({ row }) => {
              const { auth } = usePage().props;
              const rolesCheck = auth.user.roles.map((role: { name: string }) => role.name);
              const { delete: deleteAction } = useForm();
              return (
                  <>
                      {rolesCheck.includes('librarian') && (
                          <div>
                              <Link href={route('users.edit', row.original.id)}>
                                  <Button variant="link" className="cursor-pointer text-blue-500">
                                      Edit
                                  </Button>
                              </Link>
                              <Button
                                  variant="link"
                                  className="cursor-pointer text-red-500"
                                  onClick={(e) => {
                                      e.preventDefault();
                                      if (confirm('Are you sure you want to delete this user?')) {
                                          deleteAction(route('users.destroy', { id: row.original.id }));
                                      }
                                  }}
                              >
                                  Delete
                              </Button>
                          </div>
                      )}

                  </>
              );
          },
      },
]
