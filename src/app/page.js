import dynamic from 'next/dynamic'
 
const QuranSelector = dynamic(() => import('@/components/QuranSelector'), {
  ssr: false,
})

const page = () => {

  return (
    <div>
      <QuranSelector />
    </div>
  );
};

export default page;