import Navbar from '@/components/sections/navigation/guest-navbar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const guestLinks = [
  {
    name: 'Demo',
    path: '/demo'
  },
  {
    name: 'Styles Test',
    path: '/test'
  }
];

const userLinks = [
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
    <>
      <Navbar />
      <main className='mt-20 flex flex-col items-center pb-20'>
        <div className='text-center'>
          <div className=''>
            <h1 className='text-heading-100'>Links</h1>
          </div>
          <div className='mt-2 max-w-[300px]'>
            <p className='text-body-200'>
              Temporary page to quickly access pages. Landing page will be built
              here soon
            </p>
          </div>
        </div>
        <section className='mt-10 flex w-full  flex-col items-center justify-center gap-4 px-10'>
          <div className=''>
            <h2 className='text-body-100'>Guest Routes</h2>
          </div>
          {guestLinks.map((link, index) => {
            return (
              <Button variant='outline' className={`w-full max-w-[250px]`}>
                <Link href={link.path}>{link.name}</Link>
              </Button>
            );
          })}
        </section>
        <section className='mt-10 flex w-full  flex-col items-center justify-center gap-4 px-10'>
          <div className=''>
            <h2 className='text-body-100'>User Routes</h2>
          </div>
          {userLinks.map((link, index) => {
            return (
              <Button variant='outline' className={`w-full max-w-[250px]`}>
                <Link href={link.path}>{link.name}</Link>
              </Button>
            );
          })}
        </section>
      </main>
    </>
  );
}
