import React, { useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Package, PlusIcon, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Inertia } from '@inertiajs/inertia';

interface TeamInfoProps extends PageProps {
    mainTeam: {
        allow_seats: number | null;
    } | null;
}

export default function TeamInfoCard({ auth, mainTeam }: TeamInfoProps) {
    const { t } = useTranslation();
    const { props } = usePage<TeamInfoProps>();
    const {
        team,
        teamManager,
        subscriptionName,
        subscriptionDaysLeft,
        subscriptionStatus,
        isTrial,
        auth: { user },
    } = props;
    const handleCancelPlan = () => {
        if (confirm('Are you sure to cancel your plan? You will lose your remaining usage.')) {
            Inertia.get(route('dashboard.user.payment.cancelActiveSubscription'));
        }
    };
    return (
        <AuthenticatedLayout user={auth.user} title={t("Team Info")}>
            <Head title={t("Team Info")} />

            <Card className="w-full max-w-2xl overflow-hidden shadow-xl">
                <CardHeader className={`p-6`}>
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-3xl font-bold">
                            {team ? 'Active Workspace' : 'Your Plan'}
                        </CardTitle>
                    </div>
                    {!team && (
                        <p className={`font-medium leading-relaxed mb-6 `}>
                            {subscriptionStatus ? (
                                <>
                                    {t("You have currently")} <strong>{subscriptionName}</strong>{' '}
                                    {t("plan. Will refill automatically in")} {subscriptionDaysLeft}{' '}
                                    {t("Days")}. {isTrial && t(" You are in Trial time.")}
                                </>
                            ) : (
                                t(
                                    'You have no subscription at the moment. Please select a subscription plan.',
                                )
                            )}
                        </p>
                    )}
                </CardHeader>
                <CardContent className={`p-6`}>
                    {team ? (
                        <div>
                            <p className={`font-bold `}>
                                {teamManager?.name} {teamManager?.surname}
                                <Badge className="ml-2 text-2xs">{t("Team Manager")}</Badge>
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="flex flex-col items-center justify-center mb-8">
                                <span className={`text-7xl font-bold mb-2`}>
                                    {mainTeam?.allow_seats === -1
                                        ? 'Unlimited'
                                        : mainTeam?.allow_seats?.toLocaleString()}
                                </span>
                                <source />
                                <span className={`text-xl`}>{t("Employees")}</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="flex items-center space-x-4">
                                    <Users className={`h-8 w-8`} />
                                    <div>
                                        <p className={`font-medium`}>{t("Total Employees Left")}</p>
                                        <p className={`text-2xl font-bold`}>
                                            {mainTeam?.allow_seats === -1
                                                ? 'Unlimited'
                                                : mainTeam?.allow_seats?.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                                {subscriptionStatus && (
                                    <div className="flex items-center space-x-4">
                                        <Package className={`h-8 w-8`} />
                                        <div>
                                            <p className={`font-medium`}>{t("Current Plan")}</p>
                                            <p className={`text-2xl font-bold`}>
                                                {subscriptionName}
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {subscriptionStatus && (
                                    <div className="flex items-center space-x-4">
                                        <Calendar className={`h-8 w-8`} />
                                        <div>
                                            <p className={`font-medium`}>
                                                {t("Days Until Refill")}
                                            </p>
                                            <p className={`text-2xl font-bold`}>
                                                {subscriptionDaysLeft}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                                {subscriptionStatus && (
                                    <Button
                                        variant="link"
                                        className="hover:text-red-500"
                                        onClick={handleCancelPlan}
                                    >
                                        Cancel My Plan
                                    </Button>
                                )}
                                <Link href={route("dashboard.user.payment.subscription")}>
                                    <Button>
                                        <PlusIcon className="size-4" />
                                        Upgrade Your Plan
                                    </Button>
                                </Link>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
