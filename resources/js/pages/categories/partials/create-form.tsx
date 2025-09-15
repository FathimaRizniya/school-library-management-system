
import InputError from '@/components/input-error'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useForm } from '@inertiajs/react'
import { LoaderCircle } from 'lucide-react'
import React from 'react'

const CreateForm = () => {
  const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
    name: '',

  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('categories.store'), {
      preserveScroll: true,
      onSuccess: () => {
        reset()
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
              placeholder="Category Name"
            />
            <InputError message={errors.name} className="mt-2" />
          </div>
       </div>


        <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
          {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
          Add Category
        </Button>


      </form>

    </div>
  )
}

export default CreateForm
