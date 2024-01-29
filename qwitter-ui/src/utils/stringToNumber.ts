export const stringToNumber = (str: string): string => {
  const num = []
  for (let i = 0; i < str.length; i++) {
    if(!Number.isNaN(Number(str[i]))) {
      num.push(str[i])
    }
  }
  return num.join('')
}