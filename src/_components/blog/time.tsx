export default ({ date }: Lume.Data, filters: Lume.Helpers) => {
  return (
    <time dateTime={filters.date(date, 'DATE')} itemProp='datePublished'>
      {filters.date(date, 'HUMAN_DATE')}
    </time>
  )
}
