import { databaseClose, databaseConnect } from '@/helpers/database';
import Person from '@/models/user-v2';

const wallets = [
  {
    name: 'Cash',
    balance: 500,
    isDeleted: {
      status: false,
      deletedAt: null
    }
  },
  {
    name: 'Savings',
    balance: 5000,
    isDeleted: {
      status: false,
      deletedAt: null
    }
  }
];

const expenses = [
  {
    name: 'Food'
  },
  {
    name: 'Transportation'
  },
  {
    name: 'Shopping'
  },
  {
    name: 'Phone'
  },
  {
    name: 'Housing'
  },
  {
    name: 'Education'
  },
  {
    name: 'Entertainment'
  },
  {
    name: 'Other'
  }
];

const incomes = [
  {
    name: 'Salary'
  },
  {
    name: 'Allowance'
  },
  {
    name: 'Investments'
  },
  {
    name: 'Business'
  },
  {
    name: 'Other'
  }
];

const seedPerson = async () => {
  await databaseConnect();

  const user = new Person({
    profile: {
      username: 'Mikey'
    },
    currency: {
      code: 'PHP',
      name: 'Philippine Peso'
    },
    balance: {
      totalBalance: 0,
      totalIncome: 0,
      totalExpense: 0
    },
    categories: {
      expense: expenses,
      income: incomes
    },
    wallets: wallets
  });
  await user.save();
  console.log(user);

  await databaseClose();
};
seedPerson();
