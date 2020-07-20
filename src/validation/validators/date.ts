// https://www.regextester.com/96683

export const validateDate = (date: string): boolean => {
  // eslint-disable-next-line no-control-regex
  const regExp = /(^[12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/
  return regExp.test(String(date))
}
