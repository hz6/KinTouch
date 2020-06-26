# Project name: KinTouch
A blog  web application with similar functionality as twitter (in an 'open community').

## Project description:
1. Frontend: React, Redux
2. Backend: NodeJS, ExpressJS
3. Database: MongoDB
4. Dev tools: VS code, Postman, 

## function:

1. upload photo
2. comment

## Deployment

1. change index.js
2. Package.json: "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
3. Keys.js, dev.js, prod.js, .gitignore(/config/dev.js)
4. search localhost, change them into / (routes, service)
5. Github repo + create LICENSE
6. create Heroku project + Connect to github project (Continous Integretion)
7. Recreate MongoDB (new project), Google oauth (new project), AWS (new user)
8. set up Heroku => setting => Config Vars
9. Enable Heroku Automatic Deploys or Manually deploy
10. Google oauth add redirect. AWS S3 CORS policy, copy paste localhost, change localhost to herokuapp!
