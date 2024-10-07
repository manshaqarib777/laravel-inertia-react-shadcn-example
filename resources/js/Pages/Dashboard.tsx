import { useEffect, useState } from 'react';
import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import PageContainer from '@/Components/PageContainer';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/Components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { DonationClient } from '@/Components/tables/donation-tables/client';
import { OrganizationClient } from '@/Components/tables/organization-tables/client';
import { Donation, Organization } from '@/constants/data';
import { BarChart3, Coins, EuroIcon } from 'lucide-react';

type DonationStats = {
    data: Donation[];
    currentWeek: {
        price : String;
        quantity : String;
    };
    previousWeek: {
        price : String;
        quantity : String;
    };
    currentMonth: {
        price : String;
        quantity : String;
    };
    previousMonth: {
        price : String;
        quantity : String;
    };
    totals: {
        price : String;
        quantity : String;
    };
    priceDifference: {
        week : String;
        month : String;
    };
    quantityDifference: {
        week : String;
        month : String;
    };

};

type OrganizationProps = {
    data: Organization[];
};

interface DashboardProps extends PageProps {}

export default function Dashboard({ auth }: DashboardProps) {
    const [donations, setDonations] = useState<DonationStats | null>(null);
    const [organizations, setOrganizations] = useState<OrganizationProps | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Function to fetch donations and organizations
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch donations
                const donationsResponse = await axios.get(route('donations.index'));
                setDonations(donationsResponse.data);

                // Fetch organizations
                const organizationsResponse = await axios.get(route('organizations.index'));
                setOrganizations(organizationsResponse.data);

            } catch (error: any) {
                setError('Failed to fetch data');
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    // if (error) {
    //     return <div>{error}</div>;
    // }

    return (
        <AuthenticatedLayout
            user={auth.user}
            title="Dashboard"
        >
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
                        <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        This Week
                                    </CardTitle>
                                    <EuroIcon className="h-6 w-6 text-violet-900" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold flex items-center gap-2"><EuroIcon className="h-4 w-4" /> <div>{donations?.currentWeek.price || 0}</div></div>
                                    <p className="text-xs text-muted-foreground">
                                        {donations?.priceDifference.week || 0}% compared to the previous week
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">This Month</CardTitle>
                                    <EuroIcon className="h-6 w-6 text-violet-900" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold flex items-center gap-2"><EuroIcon className="h-4 w-4" /> <div>{donations?.currentMonth.price || 0}</div></div>
                                    <p className="text-xs text-muted-foreground">
                                        {donations?.priceDifference.month || 0}% compared to the previous month
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Total Bottles Donated
                                    </CardTitle>
                                    <BarChart3 className="h-6 w-6 text-blue-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{donations?.totals.quantity || 0}</div>
                                    <p className="text-xs text-muted-foreground">
                                        Total bottles collected
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Platform Revenue
                                    </CardTitle>
                                    <Coins className="h-6 w-6 text-green-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold flex items-center gap-2"><EuroIcon className="h-4 w-4" /> <div>{donations?.totals.price || 0}</div></div>
                                    <p className="text-xs text-muted-foreground">
                                        At 0.034 cents per bottle
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                        <Card>
                            <CardHeader>
                                <CardTitle>All Donations</CardTitle>
                                <CardDescription>
                                    Donate bottles to support recycling efforts and help fund environmental and charitable programs.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <DonationClient data={donations?.data || []} />
                            </CardContent>
                        </Card>
                        {(loading == false && auth.user?.role === "admin") ? <Card>
                            <CardHeader>
                                <CardTitle>New Organization Requests</CardTitle>
                                <CardDescription>
                                    Review and approve Organizations to participate in the bottle deposit program.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <OrganizationClient data={organizations?.data || []} />
                            </CardContent>
                        </Card> : "" }
                    </TabsContent>
                </Tabs>
            </div>
        </AuthenticatedLayout>
    );
}
