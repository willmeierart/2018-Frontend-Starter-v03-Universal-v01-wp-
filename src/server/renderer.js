import React from 'react'
import { renderToString } from 'react-dom/server'
import {Provider} from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import serialize from 'serialize-javascript'

import Routes from '../shared/Routes'

const DEV = process.env.NODE_ENV === 'development'
const assetManifest = JSON.parse(process.env.REACT_APP_ASSET_MANIFEST || '{}')
const bundleUrl = DEV ?
  '/static/js/bundle.js' :
  `/${assetManifest['main.js']}`
const css = DEV ?
  '' : // in DEV the css is hot loaded
  `<link href="/${assetManifest['main.css']}" media="all" rel="stylesheet" />`

export default (req, store) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={{}}>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>
  )
  return `
    <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          <meta name="theme-color" content="#ffffff">
          ${css}
          <link rel="manifest" href="/public/manifest.json">
          <link rel="shortcut icon" href="/public/zero.ico">
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXXX-X"></script>
          <title>Agency Zero React App</title>
        </head>
        <body>
          <div id="root">${content}</div>
          <script>
            window.INITIAL_STATE = ${serialize(store.getState())}
          </script>
          <script type="application/javascript" src="${bundleUrl}"></script>
        </body>
    </html>
  `
}
