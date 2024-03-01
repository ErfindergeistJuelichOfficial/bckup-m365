export function pathArrToString(pathArr: string[]): string {
  let str = "."

  pathArr.forEach(path => {
    str += `/${path}`
  })

  return str
}