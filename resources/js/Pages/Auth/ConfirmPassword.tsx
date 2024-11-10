import { useEffect, FormEventHandler } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/components/InputError';
import { Label } from '@/components/ui/label';
import PrimaryButton from '@/components/PrimaryButton';
import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ConfirmPassword() {

    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.confirm'));
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password" />
            <Link
                href={route("login")}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 absolute right-4 top-4 md:right-8 md:top-8"
            >
                Login
            </Link>
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">Password Confirmation</h1>
                    <p className="text-sm text-muted-foreground">
                        This is a secure area of the application. Please confirm your password before continuing.
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-2">
                    <div className="mt-4">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('password', e.target.value)}
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <Button className="ml-auto w-full" variant="secondary" disabled={processing} type="submit">
                        Confirm
                    </Button>
                </form>
                <p className="px-8 text-center text-sm text-muted-foreground">
                    By clicking continue, you agree to our{' '}
                    <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
                        Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link
                        href="/privacy"
                        className="underline underline-offset-4 hover:text-primary"
                    >
                        Privacy Policy
                    </Link>
                    .
                </p>
            </div>
        </GuestLayout>
    );
}
