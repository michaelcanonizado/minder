import Bento from '@/components/sections/bento';
import Form from '@/components/sections/form';
import { getCategoriesData } from '@/lib/category/get-categories-data';
import { getWalletsData } from '@/lib/wallet/get-wallets-data';

const IncomeTrack = async () => {
  //Get user id from cookie before fetching data
  const userId = process.env.TEMP_USER_ID!;

  const wallets = await getWalletsData(userId);
  const categories = await getCategoriesData(userId);

  return (
    <div className=''>
      <div className=''></div>
      <Bento className='grid-cols-1 lg:grid-cols-2'>
        <Bento.Box>
          <Bento.Box.Header>
            <p className='text-display'>Track Income</p>
          </Bento.Box.Header>
          <Bento.Box.Content>
            <Form.Add.Income
              wallets={wallets.data}
              categories={categories.data.income}
              userId={userId}
            />
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
