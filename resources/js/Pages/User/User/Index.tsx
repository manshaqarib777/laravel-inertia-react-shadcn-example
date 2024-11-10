import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Breadcrumbs } from '@/components/BreadCrumbs';
import DataTable from './Partials/DataTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import CreateUserSheet from './Partials/CreateUserSheet';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';


const breadcrumbItems = [
    { title: 'Dashboard', link: route('dashboard.index') },
    { title: 'Employees Management', link: route('dashboard.user.employees.index') },
];

export default function Index({ auth, team }: PageProps) {
    const { t } = useTranslation(); // `t` is the translation function

    return (
        <AuthenticatedLayout user={auth.user} title={t('Employees Management')}>
            <Head title={t('Employees Management')} />
            <div className="container pt-4 pb-4 px-4 sm:px-8">
                <Breadcrumbs items={breadcrumbItems} />
                <div className="space-y-2 mt-6 w-full">
                    <Card className="min-h-[calc(100vh-450px)]">
                        <CardHeader>
                            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                                <div>
                                    <CardTitle>{t('Employees Management')}</CardTitle>
                                    <CardDescription>
                                        {t('View and manage all employee records in one place.')}
                                    </CardDescription>
                                </div>
                                <div>
                                    <CreateUserSheet />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <DataTable />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
