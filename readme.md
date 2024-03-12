# bckup-m365

tested in node 20

## App Registration

on ubuntu, create certificate (publickey) and privatekey:

`openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout privateKey.key -out certificate.cer`

create puplic key, replace the password!:

`openssl pkcs12 -export -out protected.pfx -inkey privateKey.key -in certificate.cer -password pass:pass@word1`

install cli global:

`npm install -g @pnp/cli-microsoft365`

login with devicecode:

`m365 login`

create a app registration:
TODO: test graph sites read all. used originally sharepoint sites read all

`m365 entra app add --name "backup" --apisApplication "https://graph.microsoft.com/Sites.Read.All" --certificateFile "./certificate.cer" --grantAdminConsent`

create ".env" file from the ".env.example"
update ".env" file with path and password from pfx file
update ".env" file with tenant and appId from App Registration

## Todos

- [ ] härten (Bugfixes, code review)
- [ ] config fertig erstellen
- [ ] CI/CD bauen mit upload auf FTP
- [X] APP Reg einrichten
