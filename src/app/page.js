import dynamic from 'next/dynamic'
 
const QuranSelector = dynamic(() => import('@/components/QuranSelector'), {
  ssr: false,
})

const page = () => {

  return (
    <>
      <QuranSelector />
    </>
  );
};

export default page;