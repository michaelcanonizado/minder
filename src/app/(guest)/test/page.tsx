import { screenBreakpoints } from '@/helpers/screen-breakpoints';
import { cn } from '@/lib/utils';
import React from 'react';

const Test = () => {
  return (
    <section
      className={cn(
        'mx-auto mt-20 flex w-full flex-col items-center gap-10 px-8',
        screenBreakpoints
      )}
    >
      <div className='flex w-full max-w-[500px] flex-col items-center gap-5 text-center text-foreground'>
        <div className=''>
          <h1 className='text-5xl font-bold '>Display</h1>
        </div>
        <div className=''>
          <h2 className='text-2xl font-semibold'>Heading</h2>
        </div>
        <div className=''>
          <h3 className='text-xl font-medium'>Sub Heading</h3>
        </div>
        <div className=''>
          <p className='text-base'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et
            fermentum ipsum. Sed quis neque eu ligula bibendum pharetra. Donec
            mollis at augue vel aliquet. Nulla id tincidunt dolor. Curabitur
            tincidunt urna at tortor ultricies vestibulum. Pellentesque molestie
            pretium bibendum. Cras sed leo sed felis tincidunt hendrerit.
          </p>
        </div>
        <div className=''>
          <p className='text-xs text-muted'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et
            fermentum ipsum.
          </p>
        </div>
      </div>
      <div className=''>
        <div className='flex gap-5'>
          <CardBalance trend='up' />
          <CardBalance trend='down' />
        </div>
      </div>
    </section>
  );
};

const CardBalance = ({ trend }: { trend: 'up' | 'down' }) => {
  return (
    <div className='rounded-lg border '>
      <div className='p-4'>
        <div className=''>
          <p className='text-base text-muted'>Total Balance</p>
        </div>
        <div className=''>
          <p className='text-xl'>$25,808.15</p>
        </div>
        <div className=''>
          <p className='text-xs text-muted'>
            <span
              className={trend == 'up' ? 'text-[#4CDA64]' : 'text-[#FF3B2F]'}
            >
              +$1,539 (↑0.9%){' '}
            </span>
            vs last month
          </p>
        </div>
      </div>
      <div className='h-[50px] w-full bg-muted'></div>
    </div>
  );
};

export default Test;
