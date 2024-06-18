import { authenticateGoogleAPI } from '@/helpers/authenticate-google-api';

export const seedFromGoogleSheets = async () => {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  const [googleSheets, auth] = await authenticateGoogleAPI();

  const rows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: 'INCOME DATABASE'
  });

  console.log(rows.data.values);

  //   {
  //     user: user._id,
  //     wallet: user.wallets[i]._id,
  //     category: user.categories?.income[randCategory]._id,
  //     amount: randAmount,
  //     description: descriptions[randDescription],
  //     transactionDate: new Date()
  //   }

  const formattedDate = {};
};
seedFromGoogleSheets();
