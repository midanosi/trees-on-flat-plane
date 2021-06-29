import dynamic from 'next/dynamic'

const TreesOnPlane = dynamic(() => import('@/components/canvas/TreesOnPlane'), {
  ssr: false,
})
const Box = dynamic(() => import('@/components/canvas/Box'), {
  ssr: false,
})

const Page = () => {
  return (
      <>
    <TreesOnPlane r3f route='/' />
    {/* <Box r3f route='/' /> */}
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'TreesOnPlane',
    },
  }
}
