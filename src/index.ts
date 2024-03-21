
import { IConfig } from "./IConfig.js";
import { getDocLibFiles } from "./getDocLibFiles.js";
import { getListItems } from "./getListItems.js";
import { writeJsonObjectFileSync } from "./writeJsonObjectFileSync.js";
import { login } from './cli/login.js';
import { env } from './env.js'
import { addBckupPathToLocalPath } from "./addBckupPathToLocalPath.js";

async function main(config: IConfig) {

  // inist Date
  const initDate = new Date()

  console.log(initDate.toLocaleDateString())

  // update output pat to all files
  config.files?.forEach(file => {
    addBckupPathToLocalPath(initDate, file.localPath)
  })

  // update output pat to all files
  config.lists?.forEach(file => {
    addBckupPathToLocalPath(initDate, file.localPath)
  })


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
    {
      webUrl: "https://erfindergeist.sharepoint.com/sites/Vorstand/",
      folderUrl: "/Mitgliederantrge",
      localPath: ["Vorstand", "Mitgliederantrge"]
    },
    {
      webUrl: "https://erfindergeist.sharepoint.com/sites/Mitglieder/",
      folderUrl: "/Plenen",
      localPath: ["Mitglieder", "Plenen"]
    },
    {
      webUrl: "https://erfindergeist.sharepoint.com/sites/Mitglieder/",
      folderUrl: "/Kontoauszuege",
      localPath: ["Finanzen", "Kontoauszuege"]
    },
    {
      webUrl: "https://erfindergeist.sharepoint.com/sites/Mitglieder/",
      folderUrl: "/Kontakte",
      localPath: ["Mitglieder", "Kontakte"]
    },
        {
      webUrl: "https://erfindergeist.sharepoint.com/sites/Mitglieder/",
      folderUrl: "/Finanzen",
      localPath: ["Finanzen", "Finanzen"]
    },
    // TODO Dokumente Mitgliederversammlung in eigene DocLIb packe
    // TODO Dokmente Finanzen, Steuer, Verträge in eigenen DocLib
    // TODO Repaircafe DOkuente Generel. alles mit unterordnern und links. (achtung aspx
    // TODO Mobilitätswoche 2 fotos in ein allgemeinen foto ordner verschieben
    // TODO Marketing Generel und prüfen

    {
     webUrl: "https://erfindergeist.sharepoint.com/sites/Mitglieder/",
     folderUrl: "/Rechnungen",
     localPath: ["Finanzen", "Rechnungen"],
     title: "Rechnungen",
     properties: ["Jahr"],
     groupBy: ["Jahr"]
    },

    

  ],
  lists: [
     {
       webUrl: "https://erfindergeist.sharepoint.com/sites/Vorstand/",
       title: "Mitgliederanträge",
       localPath: ["Vorstand"],
       properties:  ["Person/Title", "Eintritt", "Austritt", "Sepa", "Mitgliedsbeitragsmodell", "Created", "Modified", "File/Name" ]
     },
          {
       webUrl: "https://erfindergeist.sharepoint.com/sites/Mitglieder/",
       title: "Tatigkeitsnachweise",
       localPath: ["Mitglieder"],
       properties:  ["Title", "Datum", "Beschreibung", "Thema", "Beschreibung2", "Created", "Modified", "File/Name" ]
     },
     
  ]

}

main(config)




