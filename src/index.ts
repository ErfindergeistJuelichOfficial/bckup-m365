
import { IConfig } from "./IConfig.js";
import { getDocLibFiles } from "./getDocLibFiles.js";
import { getListItems } from "./getListItems.js";
import { writeJsonObjectFileSync } from "./writeJsonObjectFileSync.js";
import { login } from './cli/login.js';
import { env } from './env.js'

async function main(config: IConfig) {

  // Login
  console.log(await login({
    ...env
  }))

  // get Files
  config.files?.map(async docLib => {
    try {
      await getDocLibFiles(docLib)
    }
    catch(error) {
      console.log(error)
    }
  })

  // get lists
  config.lists?.map(async list => {
    try {
      const listItems = await getListItems(list)
      const path = `./${list.localPath.join("/")}/${list.title}.json`

      listItems ? writeJsonObjectFileSync(path, listItems) : void
      console.log("file created:", path)
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
    // },
    // {
    //   webUrl: "https://erfindergeist.sharepoint.com/sites/Mitglieder/",
    //   folderUrl: "/Plenen",
    //   localPath: ["bckup", "Mitglieder", "Plenen"]
    // },

    //{
    //  webUrl: "https://erfindergeist.sharepoint.com/sites/Mitglieder/",
    //  folderUrl: "/Rechnungen",
    //  localPath: ["bckup", "Finanzen", "Rechnungen"],
    //  title: "Rechnungen",
    //  properties: ["Jahr"],
    //  groupBy: ["Jahr"]
    //},

    

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




