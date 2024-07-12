export default ({ query }: Lume.PageProps) => {
  return (
    <>
      <div id='search-inner' className='search'>
        <svg
          aria-hidden='true'
          role='img'
          className='search__icon'
          width='20'
          height='20'
          preserveAspectRatio='xMidYMid meet'
          viewBox='0 0 24 24'
        >
          <path
            fill='currentColor'
            d='M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7Z'
          >
          </path>
        </svg>
        <input
          id='search-input'
          type='search'
          spellCheck={false}
          placeholder='Search all posts'
          itemProp='query'
          value={query && `#${query}`}
        />
      </div>
      <div
        id='search-result'
        className='search__result'
        role='listbox'
        aria-label='Search results'
        aria-hidden='true'
      >
      </div>
    </>
  )
}
