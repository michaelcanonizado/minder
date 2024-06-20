import { cn } from '@/lib/utils';
import { AreaChart, AreaChartProps, CustomTooltipProps } from '@tremor/react';

interface AreaType extends AreaChartProps {
  className?: string;
}

const Area = ({ className, data, index, categories, ...props }: AreaType) => {
  const customTooltip = (props: CustomTooltipProps) => {
    const { payload, active } = props;
    if (!active || !payload) return null;
    return (
      <div className='rounded-tremor-default border-tremor-border bg-tremor-background text-tremor-default shadow-tremor-dropdown w-56 border p-2'>
        {payload.map((category, idx) => (
          <div key={idx} className='flex flex-1 space-x-2.5'>
            <div
              className={`flex w-1 flex-col bg-${category.color}-500 rounded`}
            />
            <div className='space-y-1'>
              <p className='text-tremor-content'>{category.dataKey}</p>
              <p className='text-tremor-content-emphasis font-medium'>
                {category.value} bpm
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <AreaChart
      className={cn('', className)}
      data={data}
      index={index}
      categories={categories}
      customTooltip={customTooltip}
      {...props}
    />
  );
};

export default Area;
