import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='mt-20 flex justify-center px-10'>
      <Button variant='outline' className='w-full max-w-[250px]'>
        <Link href='/demo'>Go to Demo</Link>
      </Button>
    </div>
  );
}
