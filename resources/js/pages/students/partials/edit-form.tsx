import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Password from '@/pages/settings/password';
import { useForm, usePage } from '@inertiajs/react';
import { log } from 'console';
import { LoaderCircle } from 'lucide-react';
import React from 'react';

const EditForm = () => {
    const { student } = usePage().props;
    console.log(student);


    const { data, setData, put, processing, errors, reset } = useForm<Required<RegisterForm>>({

        name: student.user.name,
        index_number: student.index_number,
        grade: student.grade,
        gender: student.gender,
        address: student.address,
        email: student.user.email,
        phone_number: student.user.phone_number,

    });
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('students.update', student.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };
    return (
        <div>
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            placeholder="Full name"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="index_number">Index Number</Label>
                        <Input
                            id="index_number"
                            type="text"
                            required
                            tabIndex={2}
                            autoComplete="index_number"
                            value={data.index_number}
                            onChange={(e) => setData('index_number', e.target.value)}
                            disabled={processing}
                            placeholder="Index Number"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="gender">Grade</Label>
                        <Select onValueChange={(value) => setData('grade', value)} value={data.grade} disabled={processing}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select grade" tabIndex={3} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="6A">6A</SelectItem>
                                <SelectItem value="6B">6B</SelectItem>
                                <SelectItem value="6C">6C</SelectItem>
                                <SelectItem value="7A">7A</SelectItem>
                                <SelectItem value="7B">7B</SelectItem>
                                <SelectItem value="7C">7C</SelectItem>
                                <SelectItem value="8A">8A</SelectItem>
                                <SelectItem value="8B">8B</SelectItem>
                                <SelectItem value="8C">8C</SelectItem>
                                <SelectItem value="9A">9A</SelectItem>
                                <SelectItem value="9B">9B</SelectItem>
                                <SelectItem value="9C">9C</SelectItem>
                                <SelectItem value="10A">10A</SelectItem>
                                <SelectItem value="10B">10B</SelectItem>
                                <SelectItem value="10C">10C</SelectItem>
                                <SelectItem value="11A">11A</SelectItem>
                                <SelectItem value="11B">11B</SelectItem>
                                <SelectItem value="11C">11C</SelectItem>
                                <SelectItem value="12A">12A</SelectItem>
                                <SelectItem value="12B">12B</SelectItem>
                                <SelectItem value="12C">12C</SelectItem>
                                <SelectItem value="13A">13A</SelectItem>
                                <SelectItem value="13B">13B</SelectItem>
                                <SelectItem value="13C">13C</SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.grade} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select onValueChange={(value) => setData('gender', value)} value={data.gender} disabled={processing}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select gender" tabIndex={4} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.gender} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                            id="address"
                            type="text"
                            required
                            tabIndex={5}
                            autoComplete="address"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            disabled={processing}
                            placeholder="Address"
                        />
                        <InputError message={errors.address} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            tabIndex={6}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="email@gmail.com"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="phone_number">Phone Number</Label>
                        <Input
                            id="phone_number"
                            type="text"
                            tabIndex={7}
                            autoComplete="phone_number"
                            value={data.phone_number}
                            onChange={(e) => setData('phone_number', e.target.value)}
                            disabled={processing}
                            placeholder="0777777777"
                        />
                        <InputError message={errors.phone_number} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            tabIndex={8}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Password"
                        />
                        <InputError message={errors.password} />
                    </div>
                </div>

                <Button type="submit" className="mt-2 w-full" tabIndex={9} disabled={processing}>
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Update Student
                </Button>
            </form>
        </div>
    );
};

export default EditForm;
