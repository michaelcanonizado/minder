'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

import { LinkItem, LinkItems, LinkGroup } from '@/types';
import { cn } from '@/lib/utils';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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

const linkClassNames = 'h-[16px] w-[16px]';
const mainMenuGroup: LinkGroup = {
  name: 'Main Menu',
  links: [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <Layout className={linkClassNames} />
    },
    {
      name: 'Analytics',
      href: '/analytics',
      icon: <BarChart4 className={linkClassNames} />
    }
  ]
};
const trackGroup: LinkGroup = {
  name: 'Track',
  links: [
    {
      name: 'Income',
      href: '/income/track',
      icon: <PiggyBank className={linkClassNames} />
    },
    {
      name: 'Expense',
      href: '/expense/track',
      icon: <DollarSign className={linkClassNames} />
    },
    {
      name: 'Transfer Balance',
      href: '/wallet/transfer',
      icon: <Wallet className={linkClassNames} />
    }
  ]
};
const transactionsGroup: LinkGroup = {
  name: 'Transactions',
  links: [
    {
      name: 'Income',
      href: '/income/transactions',
      icon: <TrendingUp className={linkClassNames} />
    },
    {
      name: 'Expense',
      href: '/expense/transactions',
      icon: <TrendingDown className={linkClassNames} />
    },
    {
      name: 'Transfers',
      href: '/wallet/transfers',
      icon: <Shuffle className={linkClassNames} />
    }
  ]
};
const linkGroups = [mainMenuGroup, trackGroup, transactionsGroup];

const Vertical = ({
  className,
  setOpen,
  children
}: {
  className?: string;
  setOpen?: (value: boolean) => void;
  children?: React.ReactNode;
}) => {
  const currentPathname = usePathname();

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
      <div className='flex flex-col gap-8'>
        {linkGroups.map(group => {
          return (
            <div className='flex flex-col gap-2'>
              <div className=''>
                <p className='text-body-200 text-muted-foreground'>
                  {group.name}
                </p>
              </div>
              <ul className='flex flex-col gap-1 pl-4'>
                {group.links.map(link => {
                  return (
                    <NavbarLink
                      key={link.href}
                      link={link}
                      currentPathname={currentPathname}
                      setOpen={setOpen}
                    />
                  );
                })}
              </ul>
            </div>
          );
        })}

        {children}
      </div>
    </nav>
  );
};

const UserProfilePicture = ({ className }: { className?: string }) => {
  return (
    <Avatar className={cn('hover:cursor-pointer', className)}>
      <AvatarImage src='https://avatars.githubusercontent.com/u/100785846?s=400&u=e54fbdc8f83049ca47296d0117a18b5e5b1ef1ce&v=4' />
      <AvatarFallback>
        <User />
      </AvatarFallback>
    </Avatar>
  );
};

const NavbarLink = ({
  link,
  currentPathname,
  setOpen,
  ...props
}: {
  link: LinkItem;
  currentPathname: string;
  setOpen?: (value: boolean) => void;
}) => {
  return (
    <li
      key={link.href}
      className={`transition-color rounded-lg px-2 py-1 duration-200 ease-in  ${currentPathname == link.href ? 'bg-accent' : 'hover:bg-accent/50'}`}
      {...props}
    >
      <Link
        className='flex flex-row gap-2'
        href={link.href}
        onClick={setOpen ? () => setOpen(false) : () => {}}
      >
        <div className=''>{link.icon}</div>
        <span className=''>{link.name}</span>
      </Link>
    </li>
  );
};

export default Vertical;
