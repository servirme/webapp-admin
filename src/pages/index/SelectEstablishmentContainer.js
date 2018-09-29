import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  applySpec,
  compose,
  path,
} from 'ramda'

import { getEstablishments } from '../../redux/actions/user'

const renderSingleEstablishment = (establishment) => {
  return (
    <h1 key={establishment.id}>
      {establishment.name}
    </h1>
  )
}

class SelectEstablishment extends Component {
  state = {
    establishments: [],
  }

  componentDidMount() {
    this.props.getEstablishments()
  }

  render() {
    return (
      <Fragment>
        {this.state.establishments.map(renderSingleEstablishment)}
      </Fragment>
    )
  }
}

SelectEstablishment.propTypes = {
  getEstablishments: PropTypes.func.isRequired,
}

const mapStateToProps = applySpec({
  userEstablishmentsResponse: path(['api', 'modules', 'user']),
})

const mapDispatchToProps = applySpec({
  getEstablishments,
})

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps)
)

export default enhance(SelectEstablishment)
