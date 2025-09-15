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
    const { category } = usePage().props;

    const { data, setData, put, processing, errors, reset } = useForm<Required<RegisterForm>>({

        name: category.name,


    });
    console.log(data);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('categories.update', category.id), {
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
                        <Label htmlFor="name">Category Name</Label>
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
                            placeholder="Category name"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                </div>

                <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Update Category
                </Button>
            </form>
        </div>
    );
};

export default EditForm;
