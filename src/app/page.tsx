export default function Home() {
  console.log('Hello World');

  return (
    <div className=''>
      <Header
        text={'Minder'}
        bgColor='bg-black'
        textColor='text-white'
      ></Header>
    </div>
  );
}

const Header = ({
  text,
  bgColor,
  textColor
}: {
  text: string;
  bgColor: string;
  textColor: string;
}) => {
  return (
    <h1
      className={`${bgColor} ${textColor} bg-red-700 px-4 py-2 text-2xl text-white hover:bg-red-800 sm:px-8 sm:py-3`}
    >
      {text}
    </h1>
  );
};
