import { ColumnDef } from '@tanstack/react-table';
import { Organization } from '@/constants/data';
import { Badge } from '@/components/ui/badge';
import { CellAction } from './cell-action';

export const columns = (
    handleStatusUpdate: (id: number, verified: boolean) => void,
): ColumnDef<Organization>[] => [
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'phone',
        header: 'Contact',
    },
    {
        accessorKey: 'organizationSettings',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.original.organizationSettings?.verified;

            return (
                <Badge
                    variant="default"
                    className={`${
                        status ? 'bg-green-500 hover:bg-green-600'
                            : 'bg-yellow-500 hover:bg-yellow-600'
                    } text-white transition-colors duration-300`}
                >
                    {status ? 'Verified' : 'Pending'}
                </Badge>
            );
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <CellAction data={row.original} handleStatusUpdate={handleStatusUpdate} />
        ),
    },
];
