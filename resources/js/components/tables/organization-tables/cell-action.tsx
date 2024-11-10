import { Organization } from '@/constants/data';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Inertia } from '@inertiajs/inertia'; // Inertia for making the request
import { useState } from 'react';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';

interface CellActionProps {
    data: Organization;
    handleStatusUpdate: (id: number, verified: boolean) => void; // Callback prop
}

export const CellAction: React.FC<CellActionProps> = ({ data, handleStatusUpdate }) => {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    // Function to handle status update
    const updateStatus = async (status: boolean) => {
        setLoading(true);

        // Send an Inertia request to update the status
        try {
            // Send the axios request
            const response = await axios.post(route('dashboard.organization.status'), {
                id: data.id,
                status: status,
            });
            toast({
                title: 'Success',
                variant: 'success',
                position: 'top-right',
                description: "Status updated successfully."
            });

            // Handle successful response
            handleStatusUpdate(data.id, status);
        } catch (error) {
            toast({
                title: 'Error',
                variant: 'danger',
                position: 'top-right',
                description: "Failed to update status."
            });
            // Handle errors
            console.error('Failed to update status:', error);
        } finally {
            // Always stop the loading spinner after the request finishes
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center space-x-2">
            {/* Activate Button */}
            <button
                onClick={() => updateStatus(true)}
                disabled={loading}
                className="mr-2 text-green-600 hover:text-green-900"
            >
                <CheckCircle2 className="h-5 w-5" />
            </button>

            {/* Deactivate Button */}
            <button
                onClick={() => updateStatus(false)}
                disabled={loading}
                className="text-red-600 hover:text-red-900"
            >
                <XCircle className="h-5 w-5" />
            </button>
        </div>
    );
};
