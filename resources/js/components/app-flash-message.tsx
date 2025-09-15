import { usePage } from '@inertiajs/react'
import { useEffect } from 'react';
import { toast } from 'sonner'

interface Flash {
    success?: string;
    error?: string;
}

const AppFlashMessage = () => {
    const { flash } = usePage().props as Flash;

  useEffect(() => {
      if (flash?.success) {
          toast.success(flash.success);
      }
      if (flash?.error) {
          toast.error(flash.error);
      }
  }, [flash]);
}

export default AppFlashMessage