import { cn } from '@/lib/utils';
import Balance from './balance';
import Graph from './graph';

const Bento = ({
  className,
  children,
  ...props
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={cn('grid grid-cols-2 gap-4', className)} {...props}>
      {children}
    </div>
  );
};

const Box = ({ children }: { children: React.ReactNode }) => {
  return <div className='rounded-lg border px-4 py-8'>{children}</div>;
};

Bento.Box = Box;
Bento.Balance = Balance;
Bento.Graph = Graph;
export default Bento;
