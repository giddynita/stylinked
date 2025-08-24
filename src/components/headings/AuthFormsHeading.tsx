import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Helmet } from 'react-helmet-async'

interface AuthFormsHeadingProp {
  title: string
  desc: string
}

function AuthFormsHeading({ title, desc }: AuthFormsHeadingProp) {
  return (
    <>
      <Helmet>
        <title>{`STYLINKED | ${title}`}</title>
        <meta name="description" content={desc} />
      </Helmet>
      <CardHeader className="my-1">
        <CardTitle className="text-2xl text-center mb-0.5 font-bold">
          {title}
        </CardTitle>
        <CardDescription className="text-center">{desc}</CardDescription>
      </CardHeader>
    </>
  )
}
export default AuthFormsHeading
