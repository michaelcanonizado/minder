import Header from './header';

const Bento = ({ children, ...props }: { children?: React.ReactNode }) => {
  return (
    <div className='rounded-lg border px-4 py-8' {...props}>
      {children}
    </div>
  );
};
Bento.Header = Header;
export default Bento;
