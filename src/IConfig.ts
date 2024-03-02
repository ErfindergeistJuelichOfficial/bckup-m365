// todo: rename IDingens
export interface IDinges {
  localPath: string[];
}

export interface IDocLib extends IDinges {
  webUrl: string;
  folderUrl: string;
  title: string;
  properties?: string[];
  groupBy?: string[];
}

export interface IList extends IDinges{
  webUrl: string;
  title: string;
  properties: string[];
}

export interface IConfig {
  files?: IDocLib[]
  lists?: IList[]
}