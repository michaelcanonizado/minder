'use client';

import Bento from '@/components/sections/bento';
import { useDashboardContext } from '@/context/dashboard-context';

const Income = () => {
  const userId = process.env.TEMP_USER_ID!;

  const { dashboard, changeDashboardPeriod } = useDashboardContext();

  console.log('Income component rerender');

  return (
    <Bento.Box>
      <Bento.Box.Header>Income {dashboard.period}</Bento.Box.Header>
      <Bento.Box.Content>Graph</Bento.Box.Content>
    </Bento.Box>
  );
};

export default Income;
