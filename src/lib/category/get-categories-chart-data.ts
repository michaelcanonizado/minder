'use server';

import { databaseConnect } from '@/helpers/database/database';
import mongoose from 'mongoose';
import User, { UserCategoryType } from '@/models/user';
import Income from '@/models/income';
import Expense from '@/models/expense';
import { ExpenseType } from '@/models/expense';

import { getThisWeekStartAndEndDates } from '@/helpers/dates/get-this-week-start-and-end-dates';
import { getThisMonthStartAndEndDates } from '@/helpers/dates/get-this-month-start-and-end-dates';
import { getThisYearStartAndEndDates } from '@/helpers/dates/get-this-year-start-and-end-dates';

import { CategoryChartData, Period, PeriodDates } from '@/types';

export const getCategoriesChartData = async (
  userId: string,
  period: Period
) => {
  await databaseConnect();

  let periodDates: PeriodDates | null = null;

  if (period === 'weekly') {
    periodDates = getThisWeekStartAndEndDates();
  } else if (period === 'monthly') {
    periodDates = getThisMonthStartAndEndDates();
  } else if (period === 'yearly') {
    periodDates = getThisYearStartAndEndDates();
  }

  if (!periodDates) {
    return {};
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found!');
  }
  const expenseCategories = JSON.parse(
    JSON.stringify(user.categories.expense)
  ) as UserCategoryType[];
  const incomeCategories = JSON.parse(
    JSON.stringify(user.categories.income)
  ) as UserCategoryType[];

  const expenseRes = await Expense.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId),
        transactionDate: {
          $lte: periodDates.endDate,
          $gte: periodDates.startDate
        }
      }
    },
    {
      $sort: {
        createdAt: 1
      }
    }
  ]).exec();
  const expenseData = JSON.parse(JSON.stringify(expenseRes)) as ExpenseType[];

  const incomeRes = await Income.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId),
        transactionDate: {
          $lte: periodDates.endDate,
          $gte: periodDates.startDate
        }
      }
    },
    {
      $sort: {
        createdAt: 1
      }
    }
  ]).exec();
  const incomeData = JSON.parse(JSON.stringify(incomeRes)) as ExpenseType[];

  const expenseCategoriesResult = [];
  const incomeCategoriesResult = [];

  for (let category of incomeCategories) {
    let totalAmount = 0;

    const filteredTransactions = incomeData.filter(income => {
      if (
        (income.category as unknown as string) ==
        (category._id as unknown as string)
      ) {
        totalAmount += income.amount;
        return income;
      }
    });

    const result = {
      _id: category._id,
      name: category.name,
      color: category.color,
      amount: totalAmount,
      rows: filteredTransactions
    };

    incomeCategoriesResult.push(result);
  }

  for (let category of expenseCategories) {
    let totalAmount = 0;

    const filteredTransactions = expenseData.filter(expense => {
      if (
        (expense.category as unknown as string) ==
        (category._id as unknown as string)
      ) {
        totalAmount += expense.amount;
        return expense;
      }
    });

    const result = {
      _id: category._id,
      name: category.name,
      color: category.color,
      amount: totalAmount,
      rows: filteredTransactions
    };

    expenseCategoriesResult.push(result);
  }

  console.log(`Expenses: `, expenseCategoriesResult);
  console.log(`Incomes: `, incomeCategoriesResult);

  return {
    expense: expenseCategoriesResult as CategoryChartData[],
    income: incomeCategoriesResult as CategoryChartData[]
  };
};
