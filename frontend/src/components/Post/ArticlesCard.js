import PropTypes from 'prop-types';
import { Component } from 'react';
import DeleteArticle from './DeleteArticle';
class ArticlesCard extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { title, text, imageUrl, id } = this.props

        return (
            <div className="card">
                <div className="card-body">
                    <ul>
                        <li>{title}</li>
                        <li>{imageUrl}</li>
                        <li>{text}</li>
                        <DeleteArticle id={id} />
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
    id: PropTypes.number
}

ArticlesCard.defaultProps = {
    title: '',
    imageUrl: '',
    text: '',
    id: '',
}

export default ArticlesCard