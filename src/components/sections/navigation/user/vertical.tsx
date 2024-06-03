'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

import { LinkItem, LinkItems } from '@/types';
import { cn } from '@/lib/utils';

import { SheetClose, Sheet } from '@/components/ui/sheet';

import {
  BarChart4,
  DollarSign,
  Layout,
  PiggyBank,
  Shuffle,
  TrendingDown,
  TrendingUp,
  User,
  Wallet
} from 'lucide-react';
import Link from 'next/link';

const mainMenuLinks: LinkItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: <Layout />
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: <BarChart4 />
  }
];
const trackLinks: LinkItems = [
  {
    name: 'Income',
    href: '/income/track',
    icon: <PiggyBank />
  },
  {
    name: 'Expense',
    href: '/expense/track',
    icon: <DollarSign />
  },
  {
    name: 'Wallet Transfer',
    href: '/wallet/transfer',
    icon: <Wallet />
  }
];
const breakdownLinks: LinkItems = [
  {
    name: 'Income',
    href: '/income/breakdown',
    icon: <TrendingUp />
  },
  {
    name: 'Expense',
    href: '/expense/breakdown',
    icon: <TrendingDown />
  },
  {
    name: 'Wallet',
    href: '/wallet/breakdown',
    icon: <Shuffle />
  }
];

const Vertical = ({
  className,
  setOpen
}: {
  className?: string;
  setOpen: (value: boolean) => void;
}) => {
  const currentPathname = usePathname();
  console.log(currentPathname);

  return (
    <nav
      className={cn(
        'flex min-h-screen flex-col items-stretch justify-start gap-8 p-8 sm:border-r-[1px]',
        className
      )}
    >
      <div className='flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between'>
        <Link href='/'>
          <h2 className='text-heading-100'>minder</h2>
        </Link>
        <UserProfilePicture className='hidden sm:block' />
      </div>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <div className=''>
            <p className='text-muted-foreground'>Main Menu</p>
          </div>
          <ul className='flex flex-col gap-2 pl-4'>
            {mainMenuLinks.map(link => {
              return (
                <VerticalLink
                  key={link.href}
                  link={link}
                  currentPathname={currentPathname}
                  setOpen={setOpen}
                />
              );
            })}
          </ul>
        </div>
        <div className='flex flex-col gap-2'>
          <div className=''>
            <p className='text-muted-foreground'>Track</p>
          </div>
          <ul className='flex flex-col gap-2 pl-4'>
            {trackLinks.map(link => {
              return (
                <VerticalLink
                  key={link.href}
                  link={link}
                  currentPathname={currentPathname}
                  setOpen={setOpen}
                />
              );
            })}
          </ul>
        </div>
        <div className='flex flex-col gap-2'>
          <div className=''>
            <p className='text-muted-foreground'>Breakdown</p>
          </div>
          <ul className='flex flex-col gap-2 pl-4'>
            {breakdownLinks.map(link => {
              return (
                <VerticalLink
                  key={link.href}
                  link={link}
                  currentPathname={currentPathname}
                  setOpen={setOpen}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

const UserProfilePicture = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'h-fit w-fit rounded-full bg-brand p-1 hover:cursor-pointer',
        className
      )}
    >
      <User />
    </div>
  );
};

const VerticalLink = ({
  link,
  currentPathname,
  setOpen,
  ...props
}: {
  link: LinkItem;
  currentPathname: string;
  setOpen: (value: boolean) => void;
}) => {
  return (
    <li
      key={link.href}
      className={`transition-color rounded-lg p-2 duration-200 ease-in  ${currentPathname == link.href ? 'bg-accent' : 'hover:bg-accent'}`}
      {...props}
    >
      <Link
        className='flex flex-row gap-2'
        href={link.href}
        onClick={() => setOpen(false)}
      >
        <div className='w-[24px]'>{link.icon}</div>
        <span className=''>{link.name}</span>
      </Link>
    </li>
  );
};

export default Vertical;
