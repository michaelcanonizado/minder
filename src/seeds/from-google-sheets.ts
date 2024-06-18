import { authenticateGoogleAPI } from '@/helpers/authenticate-google-api';
import { databaseClose, databaseConnect } from '@/helpers/database';
import Income from '@/models/income';
import User from '@/models/user';

export const seedFromGoogleSheets = async () => {
  const [googleSheets, auth] = await authenticateGoogleAPI();

  await databaseConnect();

  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const userId = process.env.TEMP_USER_ID;

  const user = await User.findById(userId);
  if (!user) {
    console.log('User not found!');
    return;
  }

  const incomeRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: 'INCOME DATABASE'
  });
  const incomeSheetRows = incomeRows.data.values ? incomeRows.data.values : [];

  await Income.deleteMany({});
  for (let i = 1; i < incomeSheetRows.length; i++) {
    const wallet = user.wallets.find(wallet => {
      if (
        wallet.name.toLowerCase().includes(incomeSheetRows[i][5].toLowerCase())
      ) {
        return wallet;
      }
    });

    const category = user.categories.income.find(category => {
      if (
        category.name
          .toLowerCase()
          .includes(incomeSheetRows[i][3].toLowerCase())
      ) {
        return category;
      }
    });

    const amount: number = parseFloat(incomeSheetRows[i][2]);
    const description: string = incomeSheetRows[i][4]
      ? incomeSheetRows[i][4]
      : '-';

    const res = new Income({
      user: userId,
      wallet: wallet ? wallet._id : null,
      category: category ? category._id : null,
      amount: amount,
      description: description,
      transactionDate: new Date(incomeSheetRows[i][1]),
      createdAt: new Date(incomeSheetRows[i][0]),
      updatedAt: new Date(incomeSheetRows[i][0])
    });

    if (wallet) {
      wallet.balance += amount;
    }

    user.balance.netBalance += amount;
    user.balance.totalIncome += amount;

    await res.save();
    console.log(res);
  }

  await user.save();

  await databaseClose();
  return;
};
seedFromGoogleSheets();
