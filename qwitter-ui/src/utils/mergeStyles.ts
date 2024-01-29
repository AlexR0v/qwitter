import { ClassNameValue, twJoin } from 'tailwind-merge'

export const cn = (...classNames: ClassNameValue[]) => {
  return twJoin(...classNames)
}
