import { CategoryBar } from '@tremor/react';

const Stacked = () => {
  const toolTip = () => {
    return <div className=''>Category</div>;
  };

  return (
    <div>
      <CategoryBar
        values={[40, 30, 20, 10]}
        colors={['emerald', 'yellow', 'orange', 'rose']}
        showLabels={false}
        showAnimation={true}
        tooltip='asdsd'
        className='mt-3'
      />
    </div>
  );
};

export default Stacked;
