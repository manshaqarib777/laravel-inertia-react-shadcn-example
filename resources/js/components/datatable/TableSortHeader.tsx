import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDownIcon } from "lucide-react";
import { FC } from "react";

interface SortIconProps {
    sort: "asc" | "desc" | undefined;
}

const SortIcon: FC<SortIconProps> = ({ sort }) => {
    if (sort === "desc") return <ArrowDownIcon className="ml-2 h-3.5 w-3.5" />;
    if (sort === "asc") return <ArrowUpIcon className="ml-2 h-3.5 w-3.5" />;
    return <ChevronsUpDownIcon className="ml-2 h-4 w-4" />;
};

interface TableSortHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    title: string;
    sort?: "asc" | "desc";
}

const TableSortHeader: FC<TableSortHeaderProps> = ({
    className,
    title,
    sort,
    ...props
}) => {
    return (
        <div className={cn("flex items-center space-x-2", className)} {...props}>
            <Button
                variant="ghost"
                size="sm"
                className="flex items-center -ml-0.5 h-8 hover:bg-primary/50"
            >
                <span>{title}</span>
                <SortIcon sort={sort} />
            </Button>
        </div>
    );
};

export default TableSortHeader;
