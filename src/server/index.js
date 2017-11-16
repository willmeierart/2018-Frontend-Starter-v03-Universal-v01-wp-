import express from 'express'
import path from 'path'
import proxy from 'http-proxy-middleware'
import { matchRoutes } from 'react-router-config'

import renderer from './renderer'
import serverStore from './serverStore'
import Routes from '../shared/Routes'

const host = process.env.REACT_APP_HOST || 'localhost'
const serverPort = process.env.NODE_ENV === 'development'?
  process.env.REACT_APP_SERVER_PORT :
  process.env.REACT_APP_PORT || 80

const app = express()

if (process.env.NODE_ENV === 'production') {
  // In production we want to serve our JavaScripts from the file system.
  app.use('/static', express.static(path.join(process.cwd(), 'build/client/static')));
} else {
  // Otherwise we want to proxy the webpack development server.
  app.use(['/static','/sockjs-node'], proxy({
    target: `http://localhost:${process.env.REACT_APP_CLIENT_PORT}`,
    ws: true,
    logLevel: 'error'
  }));
}

app.use('/', express.static('build/client'))

app.get('*', (req,res)=>{
  const store = serverStore()

  const promises = matchRoutes(Routes,req.path).map(({route})=>{
    return route.loadData ? route.loadData(store) : null
  })

  Promise.all(promises).then(()=>{
    res.send(renderer(req, store))
  })
})


app.listen(serverPort, ()=>{
  console.log(`Listening at http://${host}:${serverPort}`)
})
