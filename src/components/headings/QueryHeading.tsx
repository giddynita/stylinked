function QueryHeading({
  query,
  queryResult,
  type,
}: {
  query: string | undefined
  queryResult: any[] | undefined
  type: string
}) {
  return (
    <>
      {query && queryResult && (
        <h2 className="text-2xl text mb-8">
          Showing {queryResult?.length} {type}
          {queryResult?.length > 1 ? 's' : ''}
          for {query}
        </h2>
      )}
    </>
  )
}
export default QueryHeading
