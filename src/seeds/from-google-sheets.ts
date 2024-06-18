import { authenticateGoogleAPI } from '@/helpers/authenticate-google-api';
import { databaseClose, databaseConnect } from '@/helpers/database';
import Expense from '@/models/expense';
import Income from '@/models/income';
import User from '@/models/user';

export const seedFromGoogleSheets = async () => {
  // Authenticate Google API
  const [googleSheets, auth] = await authenticateGoogleAPI();

  await databaseConnect();

  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const userId = process.env.TEMP_USER_ID;

  // Get User document
  const user = await User.findById(userId);
  if (!user) {
    console.log('User not found!');
    return;
  }

  // Get income sheet rows
  const incomeRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: 'INCOME DATABASE'
  });
  const incomeSheetRows = incomeRows.data.values ? incomeRows.data.values : [];

  // Delete all documents in the collection
  await Income.deleteMany({});
  // Format income sheet rows and add to the incomes collection
  for (let i = 1; i < incomeSheetRows.length; i++) {
    // Find corresponding wallet
    const wallet = user.wallets.find(wallet => {
      if (
        wallet.name.toLowerCase().includes(incomeSheetRows[i][5].toLowerCase())
      ) {
        return wallet;
      }
    });

    // Find corresponding category
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

    // Create income document
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

    // Update User's balance
    if (wallet) {
      wallet.balance += amount;
    }
    user.balance.netBalance += amount;
    user.balance.totalIncome += amount;

    await res.save();
  }

  // Get expense sheet rows
  const expenseRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: 'EXPENSES DATABASE'
  });
  const expenseSheetRows = expenseRows.data.values
    ? expenseRows.data.values
    : [];

  // Delete all documents in the collection
  await Expense.deleteMany({});
  // Format expense sheet rows and add to the expenses collection
  for (let i = 1; i < expenseSheetRows.length; i++) {
    // Find corresponding wallet
    const wallet = user.wallets.find(wallet => {
      if (
        wallet.name.toLowerCase().includes(expenseSheetRows[i][5].toLowerCase())
      ) {
        return wallet;
      }
    });

    // Find corresponding category
    const category = user.categories.expense.find(category => {
      if (
        category.name
          .toLowerCase()
          .includes(expenseSheetRows[i][3].toLowerCase())
      ) {
        return category;
      }
    });

    const amount: number = parseFloat(expenseSheetRows[i][2]);
    const description: string = expenseSheetRows[i][4]
      ? expenseSheetRows[i][4]
      : '-';

    // Create expense document
    const res = new Expense({
      user: userId,
      wallet: wallet ? wallet._id : null,
      category: category ? category._id : null,
      amount: amount,
      description: description,
      transactionDate: new Date(expenseSheetRows[i][1]),
      createdAt: new Date(expenseSheetRows[i][0]),
      updatedAt: new Date(expenseSheetRows[i][0])
    });

    // Update User's balance
    if (wallet) {
      wallet.balance -= amount;
    }
    user.balance.netBalance -= amount;
    user.balance.totalExpense += amount;

    await res.save();
  }

  // Save changes to User document
  await user.save();
  console.log(user);

  await databaseClose();
  return;
};
seedFromGoogleSheets();
