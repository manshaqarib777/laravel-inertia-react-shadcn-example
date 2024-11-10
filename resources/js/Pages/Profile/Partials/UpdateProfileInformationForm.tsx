import React, { useState } from 'react';
import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import { Button } from '@/components/ui/button';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { FormEventHandler } from 'react';
import { PageProps } from '@/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CameraIcon, SaveIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { fullUrl } from '@/utils/utils';

export default function UpdateProfileInformation({
    className = '',
}: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}) {
    const user = usePage<PageProps>().props.auth.user;
    const { toast } = useToast();

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        surname: user.surname,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
    });

    const [imagePreview, setImagePreview] = useState(fullUrl(user.avatar));

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // Patch the data by passing it as the first argument
        patch(route('dashboard.profile.update'), {
            preserveScroll: true,
            onSuccess: () => {
                toast({
                    title: 'Success',
                    variant: 'success',
                    position: 'top-right',
                    description: "Password updated successfully."
                });
            }
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setData('avatar',base64String);
                setImagePreview(base64String); // Update the preview with base64 image
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        document.getElementById('profilePicture')?.click();
    };

    return (
        <section className={className}>
            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="useremail"
                        readOnly={true}
                        disabled={true}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <Label htmlFor="surname">Surname</Label>
                    <Input
                        id="surname"
                        name="surname"
                        value={data.surname || ""}
                        className="mt-1 block w-full"
                        autoComplete="surname"
                        onChange={(e) => setData('surname', e.target.value)}
                    />
                    <InputError message={errors.surname} className="mt-2" />
                </div>

                <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                        id="phone"
                        name="phone"
                        value={data.phone ?? ''}
                        className="mt-1 block w-full"
                        autoComplete="phone"
                        onChange={(e) => setData('phone', e.target.value)}
                    />
                    <InputError message={errors.phone} className="mt-2" />
                </div>

                <div>
                    <Label htmlFor="profilePicture">Profile Picture</Label>
                    <div className='mt-2'>
                        <div className="relative inline-block">
                            <Avatar className="h-36 w-36">
                                <AvatarImage src={imagePreview as string} onClick={triggerFileInput} width={150} height={150} alt={user?.name ?? ''} />
                                <AvatarFallback className='text-7xl'>{user?.name?.[0]}</AvatarFallback>
                            </Avatar>
                            <div
                                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                                onClick={triggerFileInput}
                            >
                                <CameraIcon className="h-10 w-10 text-white" />
                            </div>
                            <input
                                id="profilePicture"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Button className='w-28' disabled={processing}>
                        <span className="mr-2">
                            <SaveIcon size={16} />
                        </span>
                        <p className="whitespace-nowrap">
                            Save
                        </p>
                    </Button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
