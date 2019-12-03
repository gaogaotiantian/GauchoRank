import React from 'react';
import RankList from './rankList.js'

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="index-page">
        <RankList />
      </div>
    )
  }
}

export default Index;
