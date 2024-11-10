import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Breadcrumbs } from '@/components/BreadCrumbs';
const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Profile', link: '/profile' },
];

export default function Edit({
    auth,
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            title="Profile"
        >
            <Head title="Profile" />
            <div className="container pt-4 pb-4 px-4 sm:px-8">
                <Breadcrumbs items={breadcrumbItems} />
                <div className="space-y-2 mt-6">
                    <Card className="min-h-[calc(100vh-250px)]">
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>
                                Update your account's profile information and email address.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Update Password</CardTitle>
                            <CardDescription>
                                Ensure your account is using a long, random password to stay secure.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <UpdatePasswordForm className="max-w-xl" />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Delete Account</CardTitle>
                            <CardDescription>
                                Once your account is deleted, all of its resources and data will be permanently deleted. Before
                                deleting your account, please download any data or information that you wish to retain.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <DeleteUserForm className="max-w-xl" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
