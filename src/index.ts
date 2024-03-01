
import { IConfig } from "./IConfig.js";
import { getDocLibFiles } from "./getDocLibFiles.js";
import { getListItems } from "./getListItems.js";

async function main(config: IConfig) {
  config.files?.forEach(docLib => {
    try {
      getDocLibFiles(docLib)
    }
    catch(error) {
      console.log(error)
    }
  })

  config.lists?.forEach(list => {
    try {
      getListItems(list)
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

    // {
    //   webUrl: "https://erfindergeist.sharepoint.com/sites/Mitglieder/",
    //   folderUrl: "/Rechnungen",
    //   localPath: ["bckup", "Finanzen", "Rechnungen"],
    //   groupBy:["Jahr"]
    // },

    

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




