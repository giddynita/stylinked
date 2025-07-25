import { Helmet } from 'react-helmet-async'

interface AccountPagesHeading {
  pageTitle: string
  pageDesc: string
}

function AccountPagesHeading({ pageTitle, pageDesc }: AccountPagesHeading) {
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
      </Helmet>
      <h1 className="text-3xl font-bold tracking-tight">{pageTitle}</h1>
      <p className="text-muted-foreground">{pageDesc}</p>
    </>
  )
}
export default AccountPagesHeading
