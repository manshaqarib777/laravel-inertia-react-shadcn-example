import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSignIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';


interface DashboardProps extends PageProps {}

export default function Dashboard({ auth }: DashboardProps) {
    const { t } = useTranslation();


    return (
        <AuthenticatedLayout user={auth.user} title="Dashboard">
            <Head title="Dashboard" />

            <div className="space-y-2">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight">Hi, Welcome back 👋</h2>
                </div>
                <Tabs defaultValue="overview" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="analytics" disabled>
                            Analytics
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="space-y-4">


                    </TabsContent>
                </Tabs>
            </div>
        </AuthenticatedLayout>
    );
}
