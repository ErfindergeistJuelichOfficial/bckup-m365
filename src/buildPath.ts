import { createFolderIfNotExists } from "./createFolderIdNotExists.js"
import { pathArrToString } from "./pathArrToString.js"

export function buildPath(pathArr: string[]) {
  for(let i = 1; i < pathArr.length + 1; i++) {
    const path = pathArrToString(pathArr.slice(0, i))
    // console.log("path:", path)
    createFolderIfNotExists(path)
  }
}