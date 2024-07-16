'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { IncomeType } from '@/models/income';

import { useToast } from '@/components/ui/use-toast';
import { usePathname } from 'next/navigation';
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
  return (
    <Dialog>
      <DialogTrigger className=''>
        <p className=''>Edit?</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Income</DialogTitle>
          <DialogDescription>Edit income details</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Income;
