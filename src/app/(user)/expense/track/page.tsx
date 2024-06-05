import Bento from '@/components/sections/bento';
import Form from '@/components/sections/form';

const ExpenseTrack = () => {
  return (
    <div className='px-8'>
      <div className=''></div>
      <Bento className='grid-cols-1 lg:grid-cols-2'>
        <Bento.Box>
          <Bento.Box.Header>
            <p className='text-display'>Track Expense</p>
          </Bento.Box.Header>
          <Bento.Box.Content>
            <Form.Transaction.Expense />
          </Bento.Box.Content>
        </Bento.Box>
        <Bento.Box>
          <Bento.Box.Placeholder />
        </Bento.Box>
      </Bento>
    </div>
  );
};

export default ExpenseTrack;
