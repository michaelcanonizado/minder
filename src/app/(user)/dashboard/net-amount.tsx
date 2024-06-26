'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import Bento from '@/components/sections/bento';

import { Period } from '@/types';
import { useDashboardContext } from '@/context/dashboard-context';

const periods: Period[] = ['weekly', 'monthly', 'yearly'];

const NetAmount = () => {
  const userId = process.env.TEMP_USER_ID!;

  const { dashboard, changeDashboardPeriod } = useDashboardContext();

  // console.log(dashboard);

  return (
    <Bento.Box className=''>
      <Bento.Box.Header>
        <div className=''></div>
        <div className=''>
          <Select
            defaultValue={dashboard.period}
            onValueChange={value => changeDashboardPeriod(value as Period)}
          >
            <SelectTrigger className='w-[180px] capitalize'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {periods.map(period => {
                  return (
                    <SelectItem
                      value={period}
                      className='capitalize'
                      key={period}
                    >
                      {period}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </Bento.Box.Header>
      <Bento.Box.Content>Graph</Bento.Box.Content>
    </Bento.Box>
  );
};

export default NetAmount;
