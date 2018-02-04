import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import { CircularProgress } from 'material-ui/Progress'

class SubmitButton extends Component {
  state = {
    submitted: false,
  }

  buttonClick = (event) => {
    const { submitted } = this.state
    if (submitted) {
      return false
    }
    this.setState({ submitted: !submitted })

    const clickResult = this.props.onClick(event)

    if (clickResult instanceof Promise) {
      return clickResult
        .tap(() => this.setState({ submitted }))
        .tapCatch(() => this.setState({ submitted }))
    }

    this.setState({ submitted })
    return clickResult
  }

  render() {
    const { submitted } = this.state
    return (
      <Button
        {...this.props}
        raised={true}
        color='primary'
        onClick={this.buttonClick}>
        {
          submitted ?
            (<CircularProgress color='inherit' size={20}/>)
            : this.props.children
        }
      </Button>
    )
  }
}

SubmitButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default SubmitButton
