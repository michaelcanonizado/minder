import Bento from '@/components/sections/bento';
import Form from '@/components/sections/form';
import React from 'react';

const ExpenseTrack = () => {
  return (
    <div className='px-8'>
      <div className=''></div>
      <Bento>
        <Bento.Box>
          <Bento.Box.Header></Bento.Box.Header>
          <Bento.Box.Content>
            <Form.Transaction />
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
