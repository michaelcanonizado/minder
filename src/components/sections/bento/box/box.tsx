import { cn } from '@/lib/utils';

const Box = ({
  className,
  children,
  ...props
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn('box-border overflow-hidden rounded-lg border', className)}
      {...props}
    >
      {children}
    </div>
  );
};

const Header = ({
  className,
  children,
  ...props
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={cn('border-b-[1px] px-4 py-8', className)} {...props}>
      {children}
    </div>
  );
};

const Content = ({
  className,
  children,
  ...props
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={cn('px-4 py-4', className)} {...props}>
      {children}
    </div>
  );
};

const Placeholder = ({
  className,
  children,
  ...props
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        'grid h-full w-full place-items-center px-4 py-4',
        className
      )}
      {...props}
    >
      <div className=''>
        <p className=''>Placeholder</p>
      </div>
    </div>
  );
};

Box.Header = Header;
Box.Content = Content;
Box.Placeholder = Placeholder;

export default Box;
