import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import React from 'react';

const CreateForm = () => {
    const { categories = [] } = usePage<{ props: { categories: { id: string; name: string }[] } }>().props;
    const { data, setData, post, processing, errors, reset } = useForm<Required<BookForm>>({
        title: '',
        author: '',
        isbn_no: '',
        category_id: '',
        cabinet_no: '',
        rack_no: '',
        available_copies: '',
        publication_year: '',
        publisher: '',
        book_price: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('books.store'), {
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
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            disabled={processing}
                            placeholder="Book Title"
                        />
                        <InputError message={errors.title} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="author">Author Name</Label>
                        <Input
                            id="author"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="author"
                            value={data.author}
                            onChange={(e) => setData('author', e.target.value)}
                            disabled={processing}
                            placeholder="Author Name"
                        />
                        <InputError message={errors.author} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="isbn_no">ISBN NO</Label>
                        <Input
                            id="isbn_no"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="isbn_no"
                            value={data.isbn_no}
                            onChange={(e) => setData('isbn_no', e.target.value)}
                            disabled={processing}
                            placeholder="ISBN No"
                        />
                        <InputError message={errors.isbn_no} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="category">Category</Label>
                        <Select value={data.category_id} onValueChange={(value) => setData('category_id', value)} disabled={processing}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>

                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem key={category.id} value={String(category.id)}>
                                        {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.category_id} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="cabinet_no">Cabinet Number</Label>
                        <Input
                            id="cabinet_no"
                            type="text"
                            tabIndex={2}
                            autoComplete="cabinet_no"
                            value={data.cabinet_no}
                            onChange={(e) => setData('cabinet_no', e.target.value)}
                            disabled={processing}
                            placeholder="Cabinet No"
                        />
                        <InputError message={errors.cabinet_no} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="rack_no">Rack Number</Label>
                        <Input
                            id="rack_no"
                            type="text"
                            tabIndex={2}
                            autoComplete="rack_no"
                            value={data.rack_no}
                            onChange={(e) => setData('rack_no', e.target.value)}
                            disabled={processing}
                            placeholder="Rack No"
                        />
                        <InputError message={errors.rack_no} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="available_copies">Available Copies</Label>
                        <Input
                            id="available_copies"
                            type="text"
                            tabIndex={2}
                            autoComplete="available_copies"
                            value={data.available_copies}
                            onChange={(e) => setData('available_copies', e.target.value)}
                            disabled={processing}
                            placeholder="Available Copies"
                        />
                        <InputError message={errors.available_copies} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="publication_year">Publication Year</Label>
                        <Input
                            id="publication_year"
                            type="text"
                            tabIndex={2}
                            autoComplete="publication_year"
                            value={data.publication_year}
                            onChange={(e) => setData('publication_year', e.target.value)}
                            disabled={processing}
                            placeholder="Publication Year"
                        />
                        <InputError message={errors.publication_year} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="publisher">Publisher</Label>
                        <Input
                            id="publisher"
                            type="text"
                            tabIndex={2}
                            autoComplete="publisher"
                            value={data.publisher}
                            onChange={(e) => setData('publisher', e.target.value)}
                            disabled={processing}
                            placeholder="Publisher"
                        />
                        <InputError message={errors.publisher} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="book_price">Book Price</Label>
                        <Input
                            id="book_price"
                            type="text"
                            required
                            tabIndex={3}
                            autoComplete="book_price"
                            value={data.book_price}
                            onChange={(e) => setData('book_price', e.target.value)}
                            disabled={processing}
                            placeholder="Book Price"
                        />
                        <InputError message={errors.book_price} />
                    </div>
                </div>

                <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Add Book
                </Button>
            </form>
        </div>
    );
};

export default CreateForm;
