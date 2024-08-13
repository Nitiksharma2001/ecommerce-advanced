export const onScrollBottom = (fetchNextPage: () => void) => {
  if (window.scrollY + window.innerHeight + 10 >= document.documentElement.scrollHeight) {
    fetchNextPage()
  }
}
