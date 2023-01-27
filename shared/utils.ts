export function classes (props: any, classes = '') {
  return Object.entries(props)
      .filter((entry) => entry[1])
      .map((entry) => entry[0])
      .join(' ')
      .concat(' ')
      .concat(classes)
      .trim()
}