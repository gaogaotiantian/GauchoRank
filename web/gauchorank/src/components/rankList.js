import React from 'react'
import {
  Link
} from "react-router-dom";

class RankListItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Link to={`/lists/${this.props.list.id}`}>{this.props.list.name}</Link>
    )
  }
}

class RankList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lists: [],
    }
  }

  getLists() {
    this.setState({
      lists: [
        {"id": "123", "name": "abca"},
        {"id": "124", "name": "abda"},
        {"id": "125", "name": "abfa"},
        {"id": "126", "name": "abga"}
      ]
    })
  }

  componentDidMount() {
    this.getLists()
  }
 
  render() {
    return (
      <div>
        {this.state.lists.map((l) => <RankListItem list={l} />)}
      </div>
    )
  }
}

export default RankList;
