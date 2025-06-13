function AccountPagesHeading({
  pageTitle,
  pageDesc,
}: {
  pageTitle: string
  pageDesc: string
}) {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight">{pageTitle}</h2>
      <p className="text-muted-foreground">{pageDesc}</p>
    </div>
  )
}
export default AccountPagesHeading
