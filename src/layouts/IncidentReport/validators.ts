export const textValidation = (value: string) => {
  const nameReg = /^[A-Za-z]+$/
  if (!nameReg.test(value)) {
    return 'Only text values expected'
  } else {
    return ''
  }
}

export const phoneValidation = (value: string) => {
  const nameReg = /^[+]*[(]?\d{1,3}[)]?[-\s.\/\d]*$/g
  if (!nameReg.test(value)) {
    return "Phone number can't be empty."
  } else {
    return ''
  }
}

export const emailValidation = (value: string) => {
  const nameReg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/

  if (!nameReg.test(value)) {
    return "Email address can't be empty."
  } else {
    return ''
  }
}

export const dateValidation = (value: string) => {
  const nameReg = /^\d\d\d\d-\d\d-\d\d$/

  if (!nameReg.test(value)) {
    return 'Only number values expected.'
  } else {
    return ''
  }
}

export const numberValidation = (value: string) => {
  const nameReg = /^\d+$/

  if (!nameReg.test(value)) {
    return 'Only number values expected.'
  } else {
    return ''
  }
}

export const nonEmpty = (
  value: string,
  callback: (value: string) => string
) => {
  return value ? callback(value) : 'This value is required'
}

export const nonEmptyText = (value: string) => {
  return nonEmpty(value, textValidation)
}

export const nonEmptyNumber = (value: string) => {
  return nonEmpty(value, numberValidation)
}
