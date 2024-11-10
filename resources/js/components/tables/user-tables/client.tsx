import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { User } from '@/constants/data';
import { Plus } from 'lucide-react';
import { columns } from './columns';
import { Link, router } from '@inertiajs/react'; // Use Inertia's router and Link

interface ProductsClientProps {
  data: User[];
}

export const UserClient: React.FC<ProductsClientProps> = ({ data }) => {

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Users`}
          description="Manage users (Client side table functionalities.)"
        />

        {/* <Button
          className="text-xs md:text-sm"
        >
            <Link className='flex' href={`/dashboard/user/new`}>
                <Plus className="mr-2 h-4 w-4" /> <span>Add New</span>
            </Link>
        </Button> */}
      </div>
      <Separator />
      <DataTable columns={columns} data={data} />
    </>
  );
};
