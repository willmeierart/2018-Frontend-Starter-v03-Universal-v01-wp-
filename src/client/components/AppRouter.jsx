import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { RouteTransition } from 'react-router-transition'

import Home from '../Home'
import Header from './Header'
import Footer from './Footer'

export default function AppRouter(props) {
  return (
    <div className='app-router'>
      <Header {...props}/>
      <main>
        <Route render={({location,history,match})=>{return(
          <RouteTransition
              pathname={location.pathname}
              atEnter={{ opacity: 0}}
              atLeave={{ opacity: 0}}
              atActive={{ opacity: 1}}
              mapStyles={styles=>({opacity:styles.opacity, transform:`translateY(${styles.translateY}px) translateZ(${styles.translateZ})`})}>
            <Switch key={location.pathname} location={location}>
              {/*<Route exact path="/" render={()=>{return(
                  <Home {...props}/>
                )}}/>
              <Route render={() => { return <Redirect to="/" /> }} />*/}
            </Switch>
          </RouteTransition>
        )}}/>
      </main>
      <Footer/>
    </div>
  )
}
