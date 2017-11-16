import React from 'react'
import { compose, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { persistStore,persistCombineReducers } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'
import storage from 'redux-persist/es/storage'
import logger from 'redux-logger'
import promise from 'redux-promise'
import thunk from 'redux-thunk'
import { BrowserRouter as Router} from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { Loader } from 'react-loaders'

import reducers from '../_redux/reducers'
import Routes from '../shared/Routes'

const config={key:'root', storage}
const reducer = persistCombineReducers(config, reducers)
// const Store = compose(
//   applyMiddleware(promise, logger, thunk),
// )(createStore)(reducer)
const Store = createStore(
  reducer,
  window.INITIAL_STATE,
  compose(
    applyMiddleware(promise,logger,thunk)
  )
)

const Persistor = persistStore(Store)
const onBeforeLift = () => {
  // take some action before the gate lifts
}

export default function AppProvider(){
  return (
    <Provider store={Store}>
      <PersistGate
          loading={
            <Loader type="line-spin-fade-loader" active/> }
          onBeforeLift={onBeforeLift}
          persistor={Persistor}>
        <Router>
          <div>{ renderRoutes(Routes) }</div>
        </Router>
      </PersistGate>
    </Provider>
  )
}

// redux-perist options:
// {
//   key: string, // the key for the persist
//   storage: Object, // the storage adapter, following the AsyncStorage api
//   version?: number, // the state version as an integer (defaults to -1)
//   blacklist?: Array<string>, // do not persist these keys
//   whitelist?: Array<string>, // only persist they keys
//   migrate?: (Object, number) => Promise<Object>,
//   transforms?: Array<Transform>,
//   throttle?: number,
//   keyPrefix?: string, // will be prefixed to the storage key
//   debug?: boolean, // true -> verbose logs
//   stateReconciler?: false | StateReconciler, // false -> do not automatically reconcile state
// }
