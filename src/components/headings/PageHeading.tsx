import { Helmet } from 'react-helmet-async'

interface PageHeadingProp {
  pageTitle: string
  pageDesc: string
}
function PageHeading({ pageTitle, pageDesc }: PageHeadingProp) {
  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
    </Helmet>
  )
}
export default PageHeading
