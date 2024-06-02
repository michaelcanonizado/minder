import { Button } from '@/components/ui/button';
import Link from 'next/link';

const links = [
  {
    name: 'Demo',
    path: '/demo'
  },
  {
    name: 'Styles Test',
    path: '/test'
  },
  {
    name: 'Dashboard',
    path: '/dashboard'
  },
  {
    name: 'Expense Tracker',
    path: '/expense/track'
  },
  {
    name: 'Expense Breakdown',
    path: '/expense/breakdown'
  },
  {
    name: 'Income Tracker',
    path: '/income/track'
  },
  {
    name: 'Income Breakdown',
    path: '/income/breakdown'
  },
  {
    name: 'Wallet Transfer',
    path: '/wallet/transfer'
  },
  {
    name: 'Wallet Breakdown',
    path: '/wallet/breakdown'
  }
];

export default function Home() {
  return (
    <div className='mt-20 flex flex-col items-center'>
      <div className='text-center'>
        <div className=''>
          <h1 className='text-4xl'>Links</h1>
        </div>
        <div className='mt-2 max-w-[300px]'>
          <p className='text- text-sm'>
            Temporary page to quickly access pages. Landing page will be built
            here soon
          </p>
        </div>
      </div>
      <section className='mt-20 flex flex-col items-center justify-center gap-4 px-10 '>
        {links.map((link, index) => {
          return (
            <Button
              variant='outline'
              className={`w-full max-w-[250px] ${index == 1 ? 'mb-10' : ''}`}
            >
              <Link href={link.path}>{link.name}</Link>
            </Button>
          );
        })}
      </section>
    </div>
  );
}
