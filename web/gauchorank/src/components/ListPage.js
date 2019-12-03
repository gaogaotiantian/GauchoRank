import React from "react";
import {
  useParams,
  withRouter
} from "react-router-dom"

class ListPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <p>{this.props.match.params.id}</p>
    )
  }
}

export default withRouter(ListPage);
