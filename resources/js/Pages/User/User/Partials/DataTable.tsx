import { FC, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { usePage } from '@inertiajs/react';
import { PageProps } from '@inertiajs/inertia';
import TableSortHeader from '@/components/datatable/TableSortHeader';
import TablePagination from '@/components/datatable/TablePagination';
import TableToolbar from '@/components/datatable/TableToolbar';
import useDebouncedSearch from '@/hooks/useDebouncedSearch';
import useSorting from '@/hooks/useSorting';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { MoreHorizontal, Edit, Trash } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import EditUserSheet from './EditUserSheet';
import DeleteUserDialog from './DeleteUserDialog';
import { useTranslation } from 'react-i18next';
import { User } from '../lib/schema'
import { Badge } from '@/components/ui/badge';


interface DataTableProps extends PageProps {
    users: {
        data: User[];
        links: any;
        meta: any;
    };
    filters: any;
}

const DataTable: FC = () => {
    const { t } = useTranslation();
    const { data: users, links, meta } = usePage<DataTableProps>().props.users;
    const { filters } = usePage<DataTableProps>().props;
    const { params, setParams, setTimeDebounce } = useDebouncedSearch(
        route(route().current() || ''),
        filters,
    );
    const { sort } = useSorting(filters, setParams);


    const [openEditSheet, setEditSheet] = useState(false); // State for opening and closing the sheet
    const [openDeleteSheet, setDeleteSheet] = useState(false); // State for opening and closing the sheet
    const [selectedUser, setSelectedUser] = useState<User | null>(null); // Track the selected user
    const handleEdit = (user: User) => {
        setTimeout(() => {
            setSelectedUser(user);
            setEditSheet(true);
        }, 100);
    };

    const handleDelete = (user: User) => {
        setTimeout(() => {
            setSelectedUser(user);
            setDeleteSheet(true);
        }, 100);
    };
    // console.log(selectedUser);
    return (
        <div className="space-y-4">
            <TableToolbar
                placeholder={t("Search employees")}
                search={params && params.search}
                params={params}
                setParams={setParams}
                setTimeDebounce={setTimeDebounce}
            />
            {/* <div className="flex flex-col gap-1 sm:flex-row sm:space-x-1">
                <TableFilter
                    title="Status"
                    filter="status"
                    options={status}
                    params={params}
                    setParams={setParams}
                    setTimeDebounce={setTimeDebounce}
                />
                <TableFilter
                    title="Categories"
                    filter="categories"
                    options={categoryOptions}
                    params={params}
                    setParams={setParams}
                    setTimeDebounce={setTimeDebounce}
                />
            </div> */}
            <div className="relative overflow-auto w-100">
                <ScrollArea className="rounded-md border">
                    <Table className="">
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    <TableSortHeader
                                        title={t("Name")}
                                        onClick={() => {
                                            setTimeDebounce(50);
                                            sort('name');
                                        }}
                                        sort={params && params.col === 'name' ? params.sort : null}
                                    />
                                </TableHead>
                                <TableHead>
                                    <TableSortHeader
                                        title={t("Country")}
                                        onClick={() => {
                                            setTimeDebounce(50);
                                            sort('country');
                                        }}
                                        sort={params && params.col === 'country' ? params.sort : null}
                                    />
                                </TableHead>
                                <TableHead>
                                    <TableSortHeader
                                        title={t("Status")}
                                        onClick={() => {
                                            setTimeDebounce(50);
                                            sort('status');
                                        }}
                                        sort={params && params.col === 'status' ? params.sort : null}
                                    />
                                </TableHead>
                                <TableHead>
                                    <TableSortHeader
                                        title={t("Created At")}
                                        onClick={() => {
                                            setTimeDebounce(50);
                                            sort('created_at');
                                        }}
                                        sort={params && params.col === 'created_at' ? params.sort : null}
                                    />
                                </TableHead>
                                <TableHead ></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users && users.length > 0 ? (
                                users.map((user) => (
                                    <TableRow key={user.id} className="">
                                        <TableCell>
                                            {user.name} {user.surname}
                                        </TableCell>
                                        <TableCell>
                                            {user.country}
                                        </TableCell>
                                        <TableCell>
                                            {user.status === 1 && (
                                                <Badge>
                                                    {t("Active")}
                                                </Badge>
                                            )}
                                            {user.status === 0 && (
                                                <Badge variant="destructive">
                                                    {t("Passive")}
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell>{user.created_at}</TableCell>
                                        <TableCell >
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <MoreHorizontal className="w-5 h-5 cursor-pointer" />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-40">
                                                    <DropdownMenuItem
                                                        onSelect={() => handleEdit(user) }
                                                    >
                                                        <Edit className="w-4 h-4 mr-2" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onSelect={() => handleDelete(user)}
                                                    >
                                                        <Trash className="w-4 h-4 mr-2" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={8} className="h-24 text-center ">
                                        No results found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
            <TablePagination links={links} meta={meta} />
            {/* Sheet for Edit */}
            {selectedUser && (
                <EditUserSheet
                    open={openEditSheet}
                    onOpenChange={setEditSheet}
                    user={selectedUser}
                />
            )}
            {selectedUser && (
                <DeleteUserDialog
                    open={openDeleteSheet}
                    onOpenChange={setDeleteSheet}
                    user={selectedUser}
                />
            )}
        </div>
    );
};

export default DataTable;
