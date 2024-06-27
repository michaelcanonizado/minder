'use client';

import { cn } from '@/lib/utils';
import { AreaChart, AreaChartProps, CustomTooltipProps } from '@tremor/react';
import { UserCurrencyType } from '@/models/user';

const formatCurrency = (value: number) => {
  const currency: UserCurrencyType = {
    code: 'PHP',
    name: 'Philippine Peso'
  };

  const result = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.code
  }).format(value);

  return result;
};

interface AreaType extends AreaChartProps {
  className?: string;
  showCurrency?: boolean;
}

const Area = ({
  className,
  data,
  index,
  categories,
  showCurrency = true,
  ...props
}: AreaType) => {
  const customTooltip = (props: CustomTooltipProps) => {
    const { payload, active } = props;
    if (!active || !payload) return null;

    return (
      <div className='shadow-tremor-dropdown w-56 rounded-tremor-default border border-tremor-border bg-tremor-background p-2 text-tremor-default'>
        {payload.map((category, idx) => (
          <div key={idx} className='flex flex-1 space-x-2.5'>
            <div
              className={`flex w-1 flex-col bg-${category.color}-500 rounded`}
            />
            <div className='space-y-1'>
              <p className='text-body-200 capitalize text-tremor-content'>
                {category.payload[index]}
              </p>
              <p className='text-body-100  text-tremor-content-emphasis'>
                {showCurrency
                  ? formatCurrency(category.value as number)
                  : category.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <AreaChart
      className={cn('h-[200px]', className)}
      data={data}
      index={index}
      categories={categories}
      customTooltip={customTooltip}
      showAnimation={true}
      showLegend={false}
      showYAxis={false}
      showXAxis={false}
      showGridLines={true}
      startEndOnly={true}
      showGradient={true}
      valueFormatter={showCurrency ? formatCurrency : undefined}
      curveType='linear'
      {...props}
    />
  );
};

export default Area;
