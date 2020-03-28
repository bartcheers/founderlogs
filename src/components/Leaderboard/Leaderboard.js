import React, { Component } from 'react';
import { connect } from 'react-redux';
import './leaderboard.scss';
import { getLeaderboardDB } from '../../db';

class Vote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaderboard: [],
      totalVotes: 0,
      prizeMoney: 0,
    };
  }

  async componentDidMount() {
    const leaderboard = await getLeaderboardDB();

    const highestVoteCount = leaderboard.reduce(
      (acc, cur) => (cur.votes > acc ? cur.votes : acc),
      0,
    );
    const prizeMoney = leaderboard.reduce((acc, cur) => acc + cur.buyIn, 0);

    leaderboard.reduce((acc, cur, i) => {
      const payOut = Math.round((cur.votes / highestVoteCount) * (acc * 0.5 * (cur.buyIn / 100))); // 0.5 is multiplier, 100 is max buy in
      leaderboard[i]['payOut'] = payOut;
      return acc + cur.buyIn - payOut;
    }, prizeMoney);

    this.setState({ leaderboard });
  }

  render() {
    return (
      <div className='modal leaderboard'>
        <h2>Leaderboard</h2>
        {this.state.leaderboard.map((log, i) => {
          return (
            <div key={i}>
              {i + 1}. {log.reminder}
              <br />
              <div className='stats'>
                <div>
                  <label>Votes</label>
                  <p>{log.votes}</p>
                </div>
                <div>
                  <label>Buy in</label>
                  <p>${log.buyIn}</p>
                </div>
                <div>
                  <label>Pay out</label>
                  <p>${log.payOut}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default connect(null, { getLeaderboardDB })(Vote);
