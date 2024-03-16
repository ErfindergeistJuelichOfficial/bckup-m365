export function addBckupPathToLocalPath(initDate: Date, localPath:string[]): void{
  const initIsoString = initDate.toISOString()

  localPath.unshift(initIsoString)

  localPath.unshift("bckup")
}