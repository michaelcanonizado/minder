import Bento from '@/components/sections/bento';
import Form from '@/components/sections/form';
import { getWalletsAndCategoriesData } from '@/lib/get-wallets-and-categories-data';

const WalletTransfer = async () => {
  //Get user id from cookie before fetching data
  const userId = process.env.TEMP_USER_ID!;

  const data = await getWalletsAndCategoriesData(userId);

  return (
    <div className='px-8'>
      <div className=''></div>
      <Bento className='grid-cols-1 lg:grid-cols-2'>
        <Bento.Box>
          <Bento.Box.Header>
            <p className='text-display'>Transfer Balance</p>
          </Bento.Box.Header>
          <Bento.Box.Content>
            <Form.Transaction.Transfer wallets={data.wallets} userId={userId} />
          </Bento.Box.Content>
        </Bento.Box>
        <Bento.Box>
          <Bento.Box.Placeholder />
        </Bento.Box>
      </Bento>
    </div>
  );
};

export default WalletTransfer;
