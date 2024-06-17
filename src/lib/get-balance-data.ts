import { getLastWeekStartAndEndDates } from '@/helpers/dates/get-last-week-start-and-end-dates';
import { getLastMonthStartAndEndDates } from '@/helpers/dates/get-last-month-start-and-end-dates';
import { getThisWeekStartAndEndDates } from '@/helpers/dates/get-this-week-start-and-end-dates';
import { getThisMonthStartAndEndDates } from '@/helpers/dates/get-this-month-start-and-end-dates';

import { databaseClose, databaseConnect } from '@/helpers/database';
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
    console.log('User not found...');
    return;
  }
  console.log('User found!');

  const lastWeekPipeline = generatePipeline({
    userId: user._id,
    endDate: lastWeekEndDate
  });

  const expenseRes = await Expense.aggregate(lastWeekPipeline);
  const incomeRes = await Income.aggregate(lastWeekPipeline);

  const totalExpense: number = expenseRes[0] ? expenseRes[0].totalAmount : 0;
  const totalIncome: number = incomeRes[0] ? incomeRes[0].totalAmount : 0;

  console.log(
    `From ${lastWeekStartDate.toLocaleString()} to ${lastWeekEndDate.toLocaleString()}`
  );
  console.log('Total Income: ', totalIncome);
  console.log('Total Expense: ', totalExpense);

  console.log(lastWeekPipeline[0]);

  await databaseClose();
  return {
    net: {
      total: {}
    },
    income: {
      total: {},
      period: {}
    },
    expense: {
      total: {},
      period: {}
    }
  };
};
