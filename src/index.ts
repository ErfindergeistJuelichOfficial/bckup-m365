
import { IConfig, IDocLib, IList } from "./IConfig";
import { IFile } from "./IFilte";

var fs = require('fs');




const { execSync, exec } = require('node:child_process');

// m365 spo list get --webUrl "https://erfindergeist.sharepoint.com/sites/Vorstand/" --title "Mitgliederanträge"


function createFolderIfNotExists(path: string) {
  if (!fs.existsSync(path)){
    fs.mkdirSync(path);
  }
}

function pathArrToString(pathArr: string[]): string {
  let str = "."

  pathArr.forEach(path => {
    str += `/${path}`
  })

  return str
}

function buildPath(pathArr: string[]) {
  for(let i = 1; i < pathArr.length + 1; i++) {
    const path = pathArrToString(pathArr.slice(0, i))
    console.log("path:", path)
    createFolderIfNotExists(path)
  }
}

async function getFiles(docLib: IDocLib) {
  const fileList = execSync(`m365 spo file list --webUrl "${docLib.webUrl}" --folderUrl "${docLib.folderUrl}"`).toString();

  const fileListJSON = await JSON.parse(fileList)

  buildPath(docLib.localPath)

  fileListJSON.map(async (item: IFile, index: number) => {
    const path = `./${docLib.localPath.join("/")}/${item.Name}`
    console.log("creating file:", path)
    const result = execSync(`m365 spo file get --webUrl "https://erfindergeist.sharepoint.com/sites/Vorstand/" --id ${item.UniqueId} --asFile --path "${path}"` );
  })
}

async function getItems(list: IList) {
  
  const listitemGet = execSync(`m365 spo listitem list --webUrl "${list.webUrl}" --listTitle "${list.title}"`).toString();

  const listitemGetJSON = await JSON.parse(listitemGet)

  // console.log(listitemGetJSON)

  buildPath(list.localPath)

  const collection = listitemGetJSON.map(async (item: any, index: number) => {
    const result = await execSync(`m365 spo listitem get --webUrl "https://erfindergeist.sharepoint.com/sites/Vorstand/" --listTitle ${list.title} --id ${item.Id} --properties "${list.properties.join(",")}"` ).toString();
    const json = await JSON.parse(result)
    return json
  })

  const x = await Promise.all(collection)


  
  const path = `./${list.localPath.join("/")}/${list.title}.json`
  await fs.writeFileSync(path, JSON.stringify(x, null, 2), 'utf8');

}




async function main(config: IConfig) {
  config.files?.forEach(docLib => {
    try {
      getFiles(docLib)
    }
    catch(error) {
      console.log(error)
    }
  })

  config.lists?.forEach(list => {
    try {
      getItems(list)
    }
    catch(error) {
      console.log(error)
    }
  })
  
}



const config: IConfig = {
  files: [
    // {
    //   webUrl: "https://erfindergeist.sharepoint.com/sites/Vorstand/",
    //   folderUrl: "/Mitgliederantrge",
    //   localPath: ["bckup", "Vorstand", "Mitgliederantrge"]
    // }
  ],
  lists: [
    {
      webUrl: "https://erfindergeist.sharepoint.com/sites/Vorstand/",
      title: "Mitgliederanträge",
      localPath: ["bckup", "Vorstand"],
      properties:  ["Person/Title", "Eintritt", "Austritt", "Sepa", "Mitgliedsbeitragsmodell", "Created", "Modified", "File/Name" ]
    }
  ]

}

main(config)




