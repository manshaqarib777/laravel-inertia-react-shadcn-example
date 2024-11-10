import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import InputError from '@/components/InputError';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import countries, { Country } from '@/lib/countries';
import { Icons } from '@/components/Icons';
import { PlusIcon } from 'lucide-react';



export default function CreateUserSheet() {
    const [open, setOpen] = React.useState(false);
    const { t } = useTranslation();


    const { data, setData, post, processing, errors, reset } = useForm({
        user_id: 0,
        name: '',
        surname: '',
        phone: '',
        email: '',
        avatar: null as File | null,
        password: '',
        repassword: '',
        country: '',
        status: 1,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('dashboard.user.employees.save'), {
            onSuccess: () => {
                toast.success(t('Created Successfully'));
                reset();
                setOpen(false);
            },
            onError: (errors) => {
                toast.error(t('errorOccurred'));
            },
        });
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button size="sm">
                    <PlusIcon className="size-4 mr-1" />
                    {t("Add New Employee")}
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-6 sm:max-w-md">
                <SheetHeader className="text-left">
                    <SheetTitle>{t("Create New Employee")}</SheetTitle>
                    <SheetDescription>{t("Create employee information and details quickly and efficiently.")}</SheetDescription>
                </SheetHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 overflow-y-auto no-scrollbar">
                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <Label htmlFor="name">{t('Name')}</Label>
                            <Input
                                id="name"
                                type="text"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="w-1/2">
                            <Label htmlFor="surname">{t('Surname')}</Label>
                            <Input
                                id="surname"
                                type="text"
                                value={data.surname}
                                className="mt-1 block w-full"
                                autoComplete="surname"
                                onChange={(e) => setData('surname', e.target.value)}
                                required
                            />
                            <InputError message={errors.surname} className="mt-2" />
                        </div>
                    </div>

                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <Label htmlFor="phone">{t('Phone')}</Label>
                            <Input
                                id="phone"
                                type="number"
                                value={data.phone}
                                className="mt-1 block w-full"
                                placeholder="+000000000000"
                                onChange={(e) => setData('phone', e.target.value)}
                                required
                            />
                            <InputError message={errors.phone} className="mt-2" />
                        </div>

                        <div className="w-1/2">
                            <Label htmlFor="email">{t('Email')}</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        {/* Password */}
                        <div className="w-1/2">
                            <Label htmlFor="password">{t("Password")}</Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        {/* Re-Password */}
                        <div className="w-1/2">
                            <Label htmlFor="repassword">{t("Re-Password")}</Label>
                            <Input
                                id="repassword"
                                type="password"
                                name="repassword"
                                value={data.repassword}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                onChange={(e) => setData('repassword', e.target.value)}
                                required
                            />
                            <InputError message={errors.repassword} className="mt-2" />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="avatar">{t('Avatar')}</Label>
                        <Input
                            id="avatar"
                            type="file"
                            onChange={(e) => {
                                const file = e.target.files ? e.target.files[0] : null;
                                setData('avatar', file);
                            }}
                        />
                        <InputError message={errors.avatar} className="mt-2" />
                    </div>
                    <div>
                        <Label htmlFor="country">{t('Country')}</Label>
                        <Select
                            onValueChange={(value) => setData('country', value)}
                            value={data.country}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder={t('Select Country')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {countries.map((country: Country) => (
                                        <SelectItem key={country.value} value={country.value}>
                                            {country.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.country} className="mt-2" />
                    </div>
                    <div>
                        <Label htmlFor="status">{t('Status')}</Label>
                        <Select
                            onValueChange={(value) => setData('status', Number(value))}
                            value={String(data.status)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder={t('Select Status')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="1">{t('Active')}</SelectItem>
                                    <SelectItem value="0">{t('Passive')}</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.status} className="mt-2" />
                    </div>
                    <SheetFooter className="gap-2 pt-2 sm:space-x-0">
                        <SheetClose asChild>
                            <Button type="button" variant="outline">
                                {t('Cancel')}
                            </Button>
                        </SheetClose>
                        <Button type="submit" disabled={processing}>
                            {processing && (
                                <Icons.spinner
                                    className="mr-2 size-4 animate-spin"
                                    aria-hidden="true"
                                />
                            )}
                            {t('Save')}
                        </Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}
