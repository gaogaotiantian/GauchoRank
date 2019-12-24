import React from 'react';
import RankList from './RankList.js'

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="index-page">
        <div className="text-center">
          <h1>GauchoRank</h1>
        </div>
        <RankList />
      </div>
    )
  }
}

export default Index;
