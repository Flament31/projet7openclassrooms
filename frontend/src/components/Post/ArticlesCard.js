import PropTypes from "prop-types";
import { Component } from "react";
import DeleteArticle from "./DeleteArticle";
import LikeButton from "./LikeButton";
import UpdateButton from "./UpdateButton";
class ArticlesCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title, text, imageUrl, id } = this.props;

    return (
      <div className="card text-dark my-3">
        <div className="card-body">
          <ul>
            <li>{title}</li>
            <li>{imageUrl}</li>
            <li>{text}</li>

            <DeleteArticle id={id} />
            <UpdateButton id={id} />
          </ul>
          <LikeButton id={id} />
        </div>
      </div>
    );
  }
}

ArticlesCard.propTypes = {
  title: PropTypes.string,
  imageUrl: PropTypes.string,
  text: PropTypes.string,
  id: PropTypes.number,
};

ArticlesCard.defaultProps = {
  title: "",
  imageUrl: "",
  text: "",
  id: "",
};

export default ArticlesCard;
