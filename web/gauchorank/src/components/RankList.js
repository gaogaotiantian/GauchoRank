import React from 'react'
import './RankList.css'
import {
  Link
} from "react-router-dom";

class RankListCreate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      "listTitle": ""
    }
  }

  componentWillMount (){
    this.setState ({
      "createMode": false
    })
  }

  addListHandler() {
    const data = {
      "name": this.state.value,
      "uid": 1
    }

    const options = {
      "method": "PUT",
      "body": JSON.stringify(data),
      "headers": {
        "Content-Type": 'application/json'
      }
    }

    fetch(`/api/ranklists`, options)
      .then(res => {
        console.log(res.status)
      })
  }

  render() {
    if (this.state.createMode) {
      return (
        <div className="row">
          <div className="col-8">
            <input
              className="form-control"
              placeholder="输入投票标题"
              onChange={(event) => this.setState({value: event.target.value})}
              value={this.state.value}
            />
          </div>
          <div className="col-4">
            <button
              className="btn btn-primary"
              onClick={() => this.addListHandler()}
            >
              确定
            </button>
            <button
              className="btn btn-primary"
              onClick={() => this.setState({"createMode": false})}
            >
              取消
            </button>
          </div>
        </div>
      )
    } else {
      return (
        <div className="row">
          <div className="col">
            <button
              className="btn btn-primary"
              onClick={() => this.setState({"createMode": true})}
            >
              发起投票
            </button>
          </div>
        </div>
      )
    }
  }
  
}

class RankListItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="col">
        <div className="list-item-wrap">
          <div className="list-item-title text-center">
            <Link to={`/lists/${this.props.list.id}`}>{this.props.list.name}</Link>
          </div>
          <div>
            <p>{this.props.list.optionCount}个选项</p>
          </div>
          <div>
            <p>{this.props.list.voteCount}个投票</p>
          </div>
          <div className="list-item-footer">
            <span>{`${this.props.list.activeTime.toString()}`}</span>
          </div>
        </div>
      </div>
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
    fetch ("/api/ranklists").then(res => {
      return res.json()
    }).then((data) => {
      this.setState({
        lists: data.lists
      })
    }).catch((e) => {
      this.setState({
        lists: [
          {"id": "123", "name": "abca", "optionCount": 3, "activeTime": Date()},
          {"id": "124", "name": "abda", "optionCount": 4, "activeTime": Date()},
          {"id": "125", "name": "abfa", "optionCount": 6, "activeTime": Date()},
          {"id": "126", "name": "abga", "optionCount": 2, "activeTime": Date()}
        ]
      })
    })
  }

  componentDidMount() {
    this.getLists()
  }
 
  render() {
    return (
      <div className="rank-list-container mx-auto"> 
        <div className="py-2">
          <RankListCreate />
        </div>
        <div className="row row-cols-md-3 row-cols-1">
          {this.state.lists.map((l) => <RankListItem list={l} />)}
        </div>
      </div>
    )
  }
}

export default RankList;
