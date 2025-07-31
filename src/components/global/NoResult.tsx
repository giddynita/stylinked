interface NoResultProp {
  text: string
  length: number | undefined
  icon: any
}

function NoResult({ text, length, icon }: NoResultProp) {
  const Icon = icon
  return (
    <>
      {length === 0 && (
        <div className="text-center text-muted-foreground my-8">
          <Icon className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm">{text}</p>
        </div>
      )}
    </>
  )
}
export default NoResult
