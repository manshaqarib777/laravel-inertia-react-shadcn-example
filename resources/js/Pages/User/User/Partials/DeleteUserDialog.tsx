import * as React from 'react';
import { TrashIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Icons } from '@/components/Icons';
import { User } from '../lib/schema';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

interface DeleteUserDialogProps extends React.ComponentPropsWithoutRef<typeof Dialog> {
    user: User;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function DeleteUserDialog({
    user,
    open,
    onOpenChange,
}: DeleteUserDialogProps) {
    const { t } = useTranslation();
    const { get, processing } = useForm();

    const onDelete = (e: React.FormEvent) => {
        e.preventDefault();

        get(route('dashboard.user.employees.delete', user.id), {
            onSuccess: () => {
                toast.success(`User ${user.name} has been deleted successfully.`);
                onOpenChange(false); // Close the sheet after successful update
            },
            onError: () => {
                toast.error('Failed to delete the user. Please try again.');
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t("Are you absolutely sure?")}</DialogTitle>
                    <DialogDescription>
                        {t("This action cannot be undone. This will permanently delete the user from our records.")}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2 sm:space-x-0">
                    <DialogClose asChild>
                        <Button variant="outline">{t("Cancel")}</Button>
                    </DialogClose>
                    <Button
                        aria-label="Delete user"
                        variant="destructive"
                        onClick={onDelete}
                        disabled={processing}
                    >
                        {processing && (
                            <Icons.spinner
                                className="mr-2 size-4 animate-spin"
                                aria-hidden="true"
                            />
                        )}
                        {t("Delete")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
