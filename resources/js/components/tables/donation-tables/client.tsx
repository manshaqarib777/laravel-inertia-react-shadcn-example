import { DataTable } from '@/components/ui/data-table';
import { Donation } from '@/constants/data';
import { columns } from './columns';

interface ProductsClientProps {
  data: Donation[];
}

export const DonationClient: React.FC<ProductsClientProps> = ({ data }) => {

  return (
    <>
      <DataTable columns={columns} data={data} />
    </>
  );
};
