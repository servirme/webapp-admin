import { Component } from 'react'
import BluebirdPromise from 'bluebird'

window.Promise = BluebirdPromise

function setStateParam(paramName) {
  return event => this.setState({
    [paramName]: event.target.value,
  })
}

Component.prototype.setStateParam = setStateParam
