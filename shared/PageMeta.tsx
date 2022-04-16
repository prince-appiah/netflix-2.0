import Head from 'next/head'

const PageMeta = ({ title = 'Netflix 2.0' }) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

export default PageMeta
