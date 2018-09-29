import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  applySpec,
  compose,
  path,
} from 'ramda'

import AdminLayout from '../../layouts/admin'
import SelectEstablishmentContainer from './SelectEstablishmentContainer'

class Index extends React.Component {
  renderContent = () => {
    const { selectedEstablishment } = this.props
    if (selectedEstablishment) {
      // return (<EstablishmentHome />)
    }

    return (<SelectEstablishmentContainer />)
  }

  render() {
    return (
      <AdminLayout>{this.renderContent()}</AdminLayout>
    )
  }
}

Index.propTypes = {
  selectedEstablishment: PropTypes.number.isRequired,
}

const mapStateToProps = applySpec({
  selectedEstablishment: path(['']),
})

const enhance = compose(
  connect(mapStateToProps)
)

export default enhance(Index)
