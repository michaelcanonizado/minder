import Bento from '@/components/sections/bento';
import Form from '@/components/sections/form';
import { getWalletsAndCategoriesData } from '@/lib/get-wallets-and-categories-data';

const IncomeTrack = async () => {
  //Get user id from cookie before fetching data
  const data = await getWalletsAndCategoriesData(process.env.TEMP_USER_ID!);

  console.log(data);

  return (
    <div className='px-8'>
      <div className=''></div>
      <Bento className='grid-cols-1 lg:grid-cols-2'>
        <Bento.Box>
          <Bento.Box.Header>
            <p className='text-display'>Track Income</p>
          </Bento.Box.Header>
          <Bento.Box.Content>
            <Form.Transaction.Income />
          </Bento.Box.Content>
        </Bento.Box>
        <Bento.Box>
          <Bento.Box.Placeholder />
        </Bento.Box>
      </Bento>
    </div>
  );
};

export default IncomeTrack;
