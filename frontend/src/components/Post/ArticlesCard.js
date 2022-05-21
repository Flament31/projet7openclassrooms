import PropTypes from 'prop-types'
import { Component } from 'react'

class ArticlesCard extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { title, text, imageUrl } = this.props

        return (
            <div className="card">
                <div className="card-body">
                    <ul>
                        <li>{title}</li>
                        <li>{imageUrl}</li>
                        <li>{text}</li>
                    </ul>

                </div>
            </div>
        )
    }
}

ArticlesCard.propTypes = {
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    text: PropTypes.string,
}

ArticlesCard.defaultProps = {
    title: '',
    imageUrl: '',
    text: '',
}

export default ArticlesCard