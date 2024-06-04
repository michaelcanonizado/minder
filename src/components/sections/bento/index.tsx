import { cn } from '@/lib/utils';
import Box from './box/box';

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

Bento.Box = Box;
export default Bento;
