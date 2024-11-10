
export interface User {
    id: number;
    name: string;
    surname: string;
    phone: string;
    email: string;
    avatar: File | string | null;
    country: string;
    status: 0 | 1;
    created_at: string;
    password: string;
    repassword: string;
}
