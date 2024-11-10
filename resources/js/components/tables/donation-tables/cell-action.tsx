import { Donation } from '@/constants/data';
import { CheckCircle2, Edit, MoreHorizontal, Trash, XCircle } from 'lucide-react';
import { useState } from 'react';

interface CellActionProps {
  data: Donation;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {

  return (
    <>
        <button className="mr-2 text-green-600 hover:text-green-900">
            <CheckCircle2 className="h-5 w-5" />
        </button>
        <button className="text-red-600 hover:text-red-900">
            <XCircle className="h-5 w-5" />
        </button>
    </>
  );
};
