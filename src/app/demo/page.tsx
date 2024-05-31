import Balance from '@/components/sections/demo/balance';

export default function Demo() {
  console.log('Hello World');

  return (
    <div className='mt-20 px-10'>
      <Balance>
        <Balance.Header>Balance</Balance.Header>
        <Balance.Amount amount={1234} />
      </Balance>
    </div>
  );
}
