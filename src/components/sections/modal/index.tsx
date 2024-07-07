import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogClose,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

const Modal = ({
  children,
  className,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <Dialog {...props}>
      <div className={cn('', className)}>{children}</div>
    </Dialog>
  );
};

const Trigger = ({
  children,
  className,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <DialogTrigger {...props} className={cn('', className)}>
      {children}
    </DialogTrigger>
  );
};

const Header = ({
  children,
  className,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <DialogHeader {...props} className={cn('space-y-1', className)}>
      {children}
    </DialogHeader>
  );
};
const Content = ({
  children,
  className,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <DialogContent {...props} className={cn('space-y-1', className)}>
      {children}
    </DialogContent>
  );
};
const Title = ({
  children,
  className,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <DialogTitle {...props} className={cn('', className)}>
      {children}
    </DialogTitle>
  );
};
const Description = ({
  children,
  className,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <DialogDescription {...props} className={cn('', className)}>
      {children}
    </DialogDescription>
  );
};
const Footer = ({
  children,
  className,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <DialogFooter {...props} className={cn('', className)}>
      {children}
    </DialogFooter>
  );
};
const Close = ({
  children,
  className,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <DialogClose {...props} className={cn('', className)}>
      {children}
    </DialogClose>
  );
};

Content.Title = Title;
Content.Description = Description;

Modal.Trigger = Trigger;
Modal.Content = Content;
Modal.Header = Header;
Modal.Footer = Footer;
Modal.Close = Close;

export default Modal;
