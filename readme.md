# bckup-m365


tested in node 20
## todos
- [ ] härten (Bugfixes, code review)
- [ ] config fertig erstellen
- [ ] CI/CD bauen mit upload auf FTP
  - [ ] APP Reg einrichten
  - 

## App Registration

on ubuntu, create certificate (publickey) and privatekey
`openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout privateKey.key -out certificate.cer`

create puplic key, replace the password!
`openssl pkcs12 -export -out protected.pfx -inkey privateKey.key -in certificate.cer -password pass:pass@word1`

on portal.azure.com create an app registration
upload certificate (publickey) to app reg

API Permission (Application)
SharePoint.Site.Read.All
SharePoint.Users.Read.All

create ".env" file from the ".env.example"
update ".env" file with path and password from pfx file
update ".env" file with tenant and appId from App Registration
