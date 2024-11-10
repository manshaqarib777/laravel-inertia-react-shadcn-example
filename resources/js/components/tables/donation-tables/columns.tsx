import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Donation, Organization } from '@/constants/data';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

export const columns: ColumnDef<Donation>[] = [
    {
        accessorKey: 'organization',
        header: 'Organization',
        accessorFn: (row) => {
            const organization = row.organization;
            return organization
                ? `${organization.name || ''}%%${organization.email || ''}`
                : 'No organization data';
        },
        cell: ({ row }) => {
            const organization = row.getValue('organization') as String;
            if (organization === 'No organization data') {
                return <div>{organization}</div>;
            }

            const [name, email] = organization.split('%%');
            return (
                <div>
                    <div>{name}</div>
                    <div className="text-sm text-muted-foreground">{email}</div>
                </div>
            );
        },
        filterFn: (row, columnId, filterValue) => {
            const organization = row.getValue('organization') as String;
            const organizationString = organization.toLowerCase();
            return organizationString.includes(filterValue.toLowerCase());
        },
    },
    {
        accessorKey: 'type',
        header: 'Type',
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.getValue('status') as String;
            return (
                <Badge
                    variant="default"
                    className={`${
                        status === 'approved'
                            ? 'bg-green-500 hover:bg-green-600'
                            : status === 'finished'
                            ? 'bg-blue-500 hover:bg-blue-600'
                            : 'bg-yellow-500 hover:bg-yellow-600'
                    } text-white transition-colors duration-300`}
                >
                    {status === 'approved'
                        ? 'Approved'
                        : status === 'finished'
                        ? 'Finished'
                        : 'Pending'}
                </Badge>
            );
        },
        filterFn: (row, columnId, filterValue) => {
            const status = row.getValue(columnId) as String;
            const statusString = status.toLowerCase();
            return statusString.includes(filterValue.toLowerCase());
        },
    },
    {
        accessorKey: 'date',
        header: 'Date',
    },
    {
        accessorKey: 'price',
        header: 'Amount',
    },
];
