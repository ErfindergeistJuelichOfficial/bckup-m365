import 'dotenv/config'

interface IEnv {
  certificateFile: string;
  password: string;
  tenant: string;
  appId: string; 
}

export const env: IEnv = {
  certificateFile: process.env.CERTIFICATE_FILE ?? '',
  password: process.env.PASSWORD ?? '',
  tenant: process.env.TENANT ?? '',
  appId: process.env.APP_ID ?? ''
}

export default env;
