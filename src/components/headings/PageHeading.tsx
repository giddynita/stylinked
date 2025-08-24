import { Helmet } from 'react-helmet-async'

interface PageHeadingProp {
  pageTitle: string
  pageDesc: string | undefined
}
function PageHeading({ pageTitle, pageDesc }: PageHeadingProp) {
  return (
    <Helmet>
      <title>{`STYLINKED | ${pageTitle}`}</title>
      <meta name="description" content={pageDesc} />
    </Helmet>
  )
}
export default PageHeading
