import { FC } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";
import { Link } from "@inertiajs/react";
import { Button } from '@/components/ui/button';
import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';

interface PaginationLinkProps {
    href: string | null;
    srText: string;
    icon: FC<{ className?: string }>;
    hiddenOnMd?: boolean;
}

const PaginationLink: FC<PaginationLinkProps> = ({ href, srText, icon: Icon, hiddenOnMd }) => (
    <Link
        preserveScroll
        preserveState
        href={href || '#'}
        className={`h-8 w-8 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground ${hiddenOnMd ? 'hidden md:inline-flex' : ''}`}
    >
        <span className="sr-only">{srText}</span>
        <Icon className="h-4 w-4" />
    </Link>
);

interface Meta {
    from: number | null;
    to: number | null;
    total: number;
    current_page: number;
    last_page: number;
}

interface Links {
    first: string | null;
    prev: string | null;
    next: string | null;
    last: string | null;
}

interface TablePaginationProps {
    links: Links;
    meta: Meta;
}

const TablePagination: FC<TablePaginationProps> = ({ links, meta }) => {
    return (


        <div className="grid gap-4 lg:grid-cols-2  px-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
            Showing <span className="font-bold">{meta.from || 0}</span> to <span className="font-bold">{meta.to || 0}</span> of <span className="font-bold">{meta.total}</span> entries
            </div>
            <div className="flex items-center justify-end space-x-6 lg:space-x-8">


                <div className="flex items-center space-x-2">
                    <PaginationLink href={links.first} srText="Go to first page" icon={ChevronsLeftIcon} />
                    <PaginationLink href={links.prev} srText="Go to previous page" icon={ChevronLeftIcon} />
                    <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                        Page {meta.current_page} of {meta.last_page}
                    </div>
                    <PaginationLink href={links.next} srText="Go to next page" icon={ChevronRightIcon} />
                    <PaginationLink href={links.last} srText="Go to last page" icon={ChevronsRightIcon} />
                    {/* <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        // onClick={() => table.setPageIndex(0)}
                        disabled={!links.prev}
                    >
                        <span className="sr-only">Go to first page</span>
                        <DoubleArrowLeftIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        // onClick={() => table.previousPage()}
                        disabled={!links.prev}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeftIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        // onClick={() => table.nextPage()}
                        disabled={!links.next}
                    >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        // onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!links.next}
                    >
                        <span className="sr-only">Go to last page</span>
                        <DoubleArrowRightIcon className="h-4 w-4" />
                    </Button> */}
                </div>
            </div>
        </div>
        // <div className="flex items-center justify-between">
        //     <div className="hidden md:block">
        //         <p className="text-xs text-nile-blue">
        //             Showing <span className="font-bold">{meta.from || 0}</span> to <span className="font-bold">{meta.to || 0}</span> of <span className="font-bold">{meta.total}</span> entries
        //         </p>
        //     </div>

        //     <div className="block md:hidden space-x-1">
        //         <PaginationLink href={links.first} srText="Go to first page" icon={ChevronsLeftIcon} />
        //         <PaginationLink href={links.prev} srText="Go to previous page" icon={ChevronLeftIcon} />
        //     </div>

        //     <div className="flex items-center space-x-1">
        //         <div className="text-xs  font-bold">
        //             Page {meta.current_page} of {meta.last_page}
        //         </div>
        //         <PaginationLink href={links.first} srText="Go to first page" icon={ChevronsLeftIcon} hiddenOnMd />
        //         <PaginationLink href={links.prev} srText="Go to previous page" icon={ChevronLeftIcon} hiddenOnMd />
        //         <PaginationLink href={links.next} srText="Go to next page" icon={ChevronRightIcon} />
        //         <PaginationLink href={links.last} srText="Go to last page" icon={ChevronsRightIcon} />
        //     </div>
        // </div>

    );
};

export default TablePagination;
