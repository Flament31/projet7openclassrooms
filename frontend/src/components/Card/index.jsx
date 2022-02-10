import PropTypes from 'prop-types'
import { Component } from 'react'

class Card extends Component {
    constructor(props) {
      super(props)
      this.state = {}
    }
  
    render() {
      const { name, firstname, email } = this.props
  
      return (
        <div className="card">
            <div className="card-body">
                <ul>
                    <li>{name}</li>
                    <li>{firstname}</li>
                    <li>{email}</li>
                </ul>
                
            </div>         
        </div>
      )
    }
  }
  
  Card.propTypes = {
    name: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }
  
  Card.defaultProps = {
    name: '',
    firstname: '',
    email: '',
  }
  
  export default Card