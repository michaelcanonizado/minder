'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { IncomeType } from '@/models/income';
import addWalletSchema from '@/schemas/add-wallet';
import { addNewWallet } from '@/lib/wallet/add-new-wallet';

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Dialog,
  DialogClose,
  DialogFooter,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
  DialogTitle
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/sections/form/components';

const Income = ({ defaultValues }: { defaultValues: IncomeType }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onOpenChange = (open: boolean) => {
    console.log('Dialog state:', open);
    setIsDialogOpen(open);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={onOpenChange}>
      <DialogTrigger className='text-body-100 w-full rounded px-2 py-1 transition-colors hover:bg-muted'>
        <p className='w-fit'>Edit</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Income</DialogTitle>
          <DialogDescription>Edit income details</DialogDescription>
        </DialogHeader>

        <DialogFooter className='mt-4 flex flex-row justify-end gap-2'>
          <DialogClose asChild>
            <Button type='button' variant='outline'>
              Cancel
            </Button>
          </DialogClose>

          <Button type='submit' className='w-fit px-8'>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Income;
