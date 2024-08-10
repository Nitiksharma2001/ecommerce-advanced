export const capitalizeText = (text: string) => {
  if (!text) return
  const textList = text.split(' ')
  return textList
    .map((text) => text[0].toUpperCase() + text.substring(1))
    .join(' ')
}
