import React from "react";
import {
  useParams,
  withRouter
} from "react-router-dom"

class CandidateInsert extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount (){
    this.setState ({
      "insertMode": false
    })
  }

  addCandidateHandler() {
    const data = {
      "name": "test",
      "uid": 1
    }

    const options = {
      "method": "PUT",
      "body": JSON.stringify(data),
      "headers": {
        "Content-Type": 'application/json'
      }
    }

    fetch(`/api/ranklists/${this.props.listId}/candidates`, options)
      .then(res => {
        console.log(res.status)
      })
  }

  render() {
    if (this.state.insertMode) {
      return (
        <div>
          <div class="row">
            <div class="col-8">
              <input
                className="form-control"
                placeholder="输入选项"/>
            </div>
            <div class="col-4">
              <button 
                className="btn btn-primary"
                onClick={() => this.addCandidateHandler()}
                >
                确定
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => this.setState({"insertMode": false})}
                >
                取消
              </button>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div class="row">
            <div class="col">
              <button 
                className="btn btn-primary"
                onClick={() => this.setState({"insertMode": true})}
                >
                增添选项
              </button>
            </div>
          </div>
        </div>
      )
    }
  }
}

class Candidate extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div className="row py-1">
          <div className="col-8">
            {this.props.candidate.name}  
          </div>
          <div className="col-4">
            <button 
              className={`btn ${this.props.candidate.myVote==="up"?"btn-primary":"btn-outline-primary"}`}
              onClick={() => this.props.voteHandler("up")}
              > 
              支持 {this.props.candidate.voteUp}
            </button> 

            <button 
              className={`btn ${this.props.candidate.myVote==="down"?"btn-primary":"btn-outline-primary"}`}
              onClick={() => this.props.voteHandler("down")}
              > 
              反对 {this.props.candidate.voteDown}
            </button> 
          </div>
        </div>
      </div>
    )
  }
}

class CandidateList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div className="py-2">
          <CandidateInsert
            listId={this.props.listId}
          />
        </div>
        <div>
          {this.props.candidates.map((candidate, idx) => 
            <Candidate
              key={candidate.name} 
              candidate={candidate}
              voteHandler={(vote) => this.props.voteHandler(idx, vote)}/>
          )}
        </div>
      </div>
    )
  }

}

class ListPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      "listId": this.props.match.params.id,
      "listName": "",
      "listCandidates": []
    }
  }

  componentDidMount() {
    console.log(this.state)
    this.getListData()
  }

  getListData() {
    fetch(`/api/ranklists/${this.state.listId}`).then(res => {
      return res.json()
    }).then((data) => {
      this.setState((state) => ({
        "listName": data.name
      }))
    }).catch(e => {
      this.setState((state) => ({
        "listName": "test"
      }))
    })

    fetch(`/api/ranklists/${this.state.listId}/candidates`).then(res => {
      return res.json()
    }).then((data) => {
      console.log(data)
      this.setState((state) => ({
        "listCandidates": data.candidates
      }))
    }).catch((e) => {
      this.setState((state) => ({
        "listCandidates": [
          {
            "name": "candidate1",
            "voteUp": 6,
            "voteDown": 3,
            "myVote": "none"
          },
          {
            "name": "candidate2",
            "voteUp": 6,
            "voteDown": 3,
            "myVote": "up"
          },
          {
            "name": "candidate3",
            "voteUp": 6,
            "voteDown": 3,
            "myVote": "none"
          }
        ]
      }))
    })
  }

  voteHandler(idx, vote) {
    this.setState((state) => {
      let newState = JSON.parse(JSON.stringify(state))
      let c = newState.listCandidates[idx]
      if (vote === "up") {
        if (c.myVote === "none") {
          c.voteUp += 1
          c.myVote = "up"
        } else if (c.myVote === "down") {
          c.voteUp += 1
          c.voteDown -= 1
          c.myVote = "up"
        } else if (c.myVote === "up") {
          c.voteUp -= 1
          c.myVote = "none"
        }
      } else if (vote === "down") {
        if (c.myVote === "none") {
          c.voteDown += 1
          c.myVote = "down"
        } else if (c.myVote === "down") {
          c.voteDown -= 1
          c.myVote = "none"
        } else if (c.myVote === "up") {
          c.voteUp -= 1
          c.voteDown += 1
          c.myVote = "down"
        }
      }
      return newState;
    })
  }

  render() {
    return (
      <div>
        <div className="text-center">
          <p>{this.state.listName}</p>
        </div>
        <div>
          <CandidateList 
            listId={this.state.listId}
            candidates={this.state.listCandidates}
            voteHandler={(idx, vote) => this.voteHandler(idx, vote)}/>
        </div>
      </div>
    )
  }
}

export default withRouter(ListPage);
