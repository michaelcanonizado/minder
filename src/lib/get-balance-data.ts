import { getLastWeekStartAndEndDates } from '@/helpers/dates/get-last-week-start-and-end-dates';
import { getLastMonthStartAndEndDates } from '@/helpers/dates/get-last-month-start-and-end-dates';
import { getThisWeekStartAndEndDates } from '@/helpers/dates/get-this-week-start-and-end-dates';
import { getThisMonthStartAndEndDates } from '@/helpers/dates/get-this-month-start-and-end-dates';

import { databaseConnect } from '@/helpers/database';
import User from '@/models/user';
import Income from '@/models/income';
import Expense from '@/models/expense';
import { PipelineStage } from 'mongoose';

const generatePipeline = ({
  userId,
  startDate,
  endDate
}: {
  userId: string;
  startDate?: Date;
  endDate?: Date;
}) => {
  // @ts-ignore
  const pipeline: PipelineStage[] = [];

  // Match stage for filtering by date range
  let matchStage: PipelineStage.Match = {
    $match: { user: userId }
  };

  if (endDate) {
    matchStage.$match.transactionDate = { $lte: endDate };
  }

  if (startDate) {
    if (!matchStage.$match.transactionDate) {
      matchStage.$match.transactionDate = {};
    }
    matchStage.$match.transactionDate.$gte = startDate;
  }

  pipeline.push(matchStage);

  // Group stage to calculate totalAmount
  const groupStage: PipelineStage.Group = {
    $group: {
      _id: null,
      totalAmount: { $sum: '$amount' }
    }
  };

  pipeline.push(groupStage);

  // Project stage to reshape output
  const projectStage: PipelineStage.Project = {
    $project: {
      _id: 0,
      totalAmount: 1
    }
  };

  pipeline.push(projectStage);

  return pipeline;
};

export const getBalanceData = async (userId: string) => {
  const { startDate: lastWeekStartDate, endDate: lastWeekEndDate } =
    getLastWeekStartAndEndDates();
  const { startDate: lastMonthStartDate, endDate: lastMonthEndDate } =
    getLastMonthStartAndEndDates();
  const { startDate: thisWeekStartDate, endDate: thisWeekEndDate } =
    getThisWeekStartAndEndDates();
  const { startDate: thisMonthStartDate, endDate: thisMonthEndDate } =
    getThisMonthStartAndEndDates();
  const dateNow = new Date();

  console.log('---------------------------------------');
  console.log('LW start: ', lastWeekStartDate.toLocaleString());
  console.log('LW end: ', lastWeekEndDate.toLocaleString());
  console.log('---------------------------------------');
  console.log('LM start : ', lastMonthStartDate.toLocaleString());
  console.log('LM end   : ', lastMonthEndDate.toLocaleString());
  console.log('---------------------------------------');
  console.log('TW start : ', thisWeekStartDate.toLocaleString());
  console.log('TW end   : ', thisWeekEndDate.toLocaleString());
  console.log('---------------------------------------');
  console.log('TM start : ', thisMonthStartDate.toLocaleString());
  console.log('TM end   : ', thisMonthEndDate.toLocaleString());
  console.log('---------------------------------------');
  console.log('Date now : ', dateNow.toLocaleString());
  console.log('---------------------------------------');

  await databaseConnect();

  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found!');
  }
  console.log('User found!');

  //
  //
  //
  //
  // CURRENT TOTAL
  const currentTotalPipeline = generatePipeline({
    userId: user._id,
    endDate: new Date()
  });

  const currentTotalExpenseRes = await Expense.aggregate(currentTotalPipeline);
  const currentTotalIncomeRes = await Income.aggregate(currentTotalPipeline);

  const currentTotalExpense: number = currentTotalExpenseRes[0]
    ? currentTotalExpenseRes[0].totalAmount
    : 0;
  const currentTotalIncome: number = currentTotalIncomeRes[0]
    ? currentTotalIncomeRes[0].totalAmount
    : 0;

  //
  //
  //
  //
  // LAST WEEK TOTAL
  const lastWeekTotalPipeline = generatePipeline({
    userId: user._id,
    endDate: lastWeekEndDate
  });

  const lastWeekTotalExpenseRes = await Expense.aggregate(
    lastWeekTotalPipeline
  );
  const alstWeekTotalIncomeRes = await Income.aggregate(lastWeekTotalPipeline);

  const lastWeekTotalExpense: number = lastWeekTotalExpenseRes[0]
    ? lastWeekTotalExpenseRes[0].totalAmount
    : 0;
  const lastWeekTotalIncome: number = alstWeekTotalIncomeRes[0]
    ? alstWeekTotalIncomeRes[0].totalAmount
    : 0;

  //
  //
  //
  //
  // THIS WEEK PERIOD
  const thisWeekPeriodPipeline = generatePipeline({
    userId: user._id,
    startDate: thisWeekStartDate,
    endDate: thisWeekEndDate
  });

  const thisWeekPeriodExpenseRes = await Expense.aggregate(
    thisWeekPeriodPipeline
  );
  const thisWeekPeriodIncomeRes = await Income.aggregate(
    thisWeekPeriodPipeline
  );

  const thisWeekPeriodExpense: number = thisWeekPeriodExpenseRes[0]
    ? thisWeekPeriodExpenseRes[0].totalAmount
    : 0;
  const thisWeekPeriodIncome: number = thisWeekPeriodIncomeRes[0]
    ? thisWeekPeriodIncomeRes[0].totalAmount
    : 0;

  //
  //
  //
  //
  // LAST WEEK PERIOD
  const lastWeekPeriodPipeline = generatePipeline({
    userId: user._id,
    startDate: lastWeekStartDate,
    endDate: lastWeekEndDate
  });

  const lastWeekPeriodExpenseRes = await Expense.aggregate(
    lastWeekPeriodPipeline
  );
  const lastWeekPeriodIncomeRes = await Income.aggregate(
    lastWeekPeriodPipeline
  );

  const lastWeekPeriodExpense: number = lastWeekPeriodExpenseRes[0]
    ? lastWeekPeriodExpenseRes[0].totalAmount
    : 0;
  const lastWeekPeriodIncome: number = lastWeekPeriodIncomeRes[0]
    ? lastWeekPeriodIncomeRes[0].totalAmount
    : 0;

  //
  //
  //
  //
  // THIS MONTH PERIOD
  const thisMonthPeriodPipeline = generatePipeline({
    userId: user._id,
    startDate: thisMonthStartDate,
    endDate: thisMonthEndDate
  });

  const thisMonthPeriodExpenseRes = await Expense.aggregate(
    thisMonthPeriodPipeline
  );
  const thisMonthPeriodIncomeRes = await Income.aggregate(
    thisMonthPeriodPipeline
  );

  const thisMonthPeriodExpense: number = thisMonthPeriodExpenseRes[0]
    ? thisMonthPeriodExpenseRes[0].totalAmount
    : 0;
  const thisMonthPeriodIncome: number = thisMonthPeriodIncomeRes[0]
    ? thisMonthPeriodIncomeRes[0].totalAmount
    : 0;

  //
  //
  //
  //
  // LAST MONTH PERIOD
  const lastMonthPeriodPipeline = generatePipeline({
    userId: user._id,
    startDate: lastMonthStartDate,
    endDate: lastMonthEndDate
  });

  const lastMonthPeriodExpenseRes = await Expense.aggregate(
    lastMonthPeriodPipeline
  );
  const lastMonthPeriodIncomeRes = await Income.aggregate(
    lastMonthPeriodPipeline
  );

  const lastMonthPeriodExpense: number = lastMonthPeriodExpenseRes[0]
    ? lastMonthPeriodExpenseRes[0].totalAmount
    : 0;
  const lastMonthPeriodIncome: number = lastMonthPeriodIncomeRes[0]
    ? lastMonthPeriodIncomeRes[0].totalAmount
    : 0;

  return {
    net: {
      total: {
        current: currentTotalIncome - currentTotalExpense,
        lastWeek: lastWeekTotalIncome - lastWeekTotalExpense
      }
    },
    income: {
      total: {
        current: currentTotalIncome,
        lastWeek: lastWeekTotalIncome
      },
      period: {
        thisWeek: thisWeekPeriodIncome,
        lastWeek: lastWeekPeriodIncome,
        thisMonth: thisMonthPeriodIncome,
        lastMonth: lastMonthPeriodIncome
      }
    },
    expense: {
      total: {
        current: currentTotalExpense,
        lastWeek: lastWeekTotalExpense
      },
      period: {
        thisWeek: thisWeekPeriodExpense,
        lastWeek: lastWeekPeriodExpense,
        thisMonth: thisMonthPeriodExpense,
        lastMonth: lastMonthPeriodExpense
      }
    }
  };
};
