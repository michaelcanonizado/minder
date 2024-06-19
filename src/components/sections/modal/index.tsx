import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

const Modal = ({
  children,
  className
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <Dialog>
      <div className={cn('', className)}>{children}</div>
    </Dialog>
  );
};

const Trigger = ({
  children,
  className
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <DialogTrigger className={cn('', className)}>{children}</DialogTrigger>
  );
};

const Content = ({
  children,
  className
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <DialogContent className={cn('space-y-1', className)}>
      {children}
    </DialogContent>
  );
};
const Title = ({
  children,
  className
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return <DialogTitle className={cn('', className)}>{children}</DialogTitle>;
};
const Description = ({
  children,
  className
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <DialogDescription className={cn('', className)}>
      {children}
    </DialogDescription>
  );
};

Content.Title = Title;
Content.Description = Description;

Modal.Trigger = Trigger;
Modal.Content = Content;

export default Modal;
