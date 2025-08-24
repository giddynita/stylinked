import { Helmet } from 'react-helmet-async'

interface AccountPagesHeadingProp {
  pageTitle: string
  pageDesc: string
}

function AccountPagesHeading({ pageTitle, pageDesc }: AccountPagesHeadingProp) {
  return (
    <>
      <Helmet>
        <title>{`STYLINKED | ${pageTitle}`}</title>
        <meta name="description" content={pageDesc} />
        <meta name="robots" content="noindex" />
      </Helmet>
      <h1 className="text-3xl font-bold tracking-tight">{pageTitle}</h1>
      <p className="text-muted-foreground">{pageDesc}</p>
    </>
  )
}
export default AccountPagesHeading
