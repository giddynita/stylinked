interface AccountPagesHeading {
  pageTitle: string
  pageDesc: string
}

function AccountPagesHeading({ pageTitle, pageDesc }: AccountPagesHeading) {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight">{pageTitle}</h2>
      <p className="text-muted-foreground">{pageDesc}</p>
    </div>
  )
}
export default AccountPagesHeading
