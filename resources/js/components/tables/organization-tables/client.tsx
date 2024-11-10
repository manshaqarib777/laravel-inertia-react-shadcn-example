import { DataTable } from '@/components/ui/data-table';
import { Organization } from '@/constants/data';
import { columns } from './columns';
import { useState } from 'react';

interface OrganizationClientProps {
  data: Organization[];
}

export const OrganizationClient: React.FC<OrganizationClientProps> = ({ data }) => {
  const [organizationData, setOrganizationData] = useState(data);

  // Function to update the status in the parent state
  const handleStatusUpdate = (id: number, verified: boolean) => {
    setOrganizationData((prevData) =>
      prevData.map((org) =>
        org.id === id ? { ...org, organizationSettings: { ...org.organizationSettings, verified } } : org
      )
    );
  };

  return (
    <>
      <DataTable columns={columns(handleStatusUpdate)} data={organizationData} />
    </>
  );
};
