import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

function AuthFormsHeading({ title, desc }: { title: string; desc: string }) {
  return (
    <CardHeader className="my-1">
      <CardTitle className="text-2xl text-center mb-0.5 font-bold">
        {title}
      </CardTitle>
      <CardDescription className="text-center">{desc}</CardDescription>
    </CardHeader>
  )
}
export default AuthFormsHeading
