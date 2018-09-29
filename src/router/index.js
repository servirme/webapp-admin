import React, { Fragment } from 'react'
import {
  Route,
  Switch,
} from 'react-router-dom'
import PrivateRoute from '../components/PrivateRoute'

// PAGES
import Home from '../pages/index'
import Login from '../pages/auth/LoginPage'
import Register from '../pages/auth/RegisterPage'
import Error404 from '../pages/errors/Error404'

const Router = () => {
  return (
    <Fragment>
      <Switch>
        <PrivateRoute exact path='/' component={Home}/>
        <Route exact path='/auth/login' component={Login}/>
        <Route exact path='/auth/register' component={Register}/>

        <Route component={Error404}/>
      </Switch>
    </Fragment>
  )
}

export default Router
