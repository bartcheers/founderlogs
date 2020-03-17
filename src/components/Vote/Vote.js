import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { castVote } from '../../actions/voteActions.js';
import './vote.scss';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class Vote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vote: 0,
      feedbackA: '',
      feedbackB: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onVote = this.onVote.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onVote(e) {
    e.preventDefault();

    const vote = {
      vote: this.state.vote,
      feedbackA: this.state.feedbackA,
      feedbackB: this.state.feedbackB,
    };

    this.props.castVote(vote);
  }

  pickRandom(i, avoidDuplicateI) {
    if (i <= 1) {
      return 0;
    }

    let pick = Math.round(Math.random() * (i - 1));

    if (pick === avoidDuplicateI) {
      pick = this.pickRandom(i, avoidDuplicateI);
    }

    return pick;
  }

  render() {
    const { logs } = this.props;
    let logList;
    let pickedLogs = [];

    if (typeof logs === 'object') {
      logList = Object.values(logs);

      const pickA = this.pickRandom(logList.length, null);
      const pickB = this.pickRandom(logList.length, pickA);

      pickedLogs[0] = logList[pickA];
      pickedLogs[1] = logList[pickB];
    }

    return (
      <div className='vote vertical'>
        <div className='horizontal log-wrap'>
          {pickedLogs.map((log, index) => {
            return (
              <div className='founder modal'>
                <h2>Founder {index === 0 ? 'A' : 'B'}</h2>
                <div className='log'>
                  <label>Quick reminder: what are you building?</label>
                  {log.reminder.split('\n').map((i, key) => {
                    return <div key={key}>{i}</div>;
                  })}
                  <br />
                  <br />
                  <label>What did you do this week?</label>
                  {log.completed.split('\n').map((i, key) => {
                    return <div key={key}>{i}</div>;
                  })}
                  <br />
                  <br />
                  <label>What are you planning to do next week?</label>
                  {log.planned.split('\n').map((i, key) => {
                    return <div key={key}>{i}</div>;
                  })}
                  <br />
                  <br />
                </div>
              </div>
            );
          })}
        </div>
        <div className='modal form'>
          <h2>Vote</h2>
          <form onSubmit={this.onVote}>
            <div>
              <label>Who made more progress?</label>
              <div className='horizontal switch-wrap'>
                <span>Founder A</span>
                <label className='switch'>
                  <input
                    type='checkbox'
                    onInput={this.onToggle}
                    value={this.state.vote === 'a' ? true : false}
                  />
                  <span className='slider round'></span>
                </label>
                <span>Founder B</span>
              </div>
            </div>
            <div className='horizontal'>
              <div className='feedback'>
                <label>Feedback for founder A</label>
                <textarea name='feedbackA' onChange={this.onChange} value={this.state.feedbackA} />
              </div>
              <div className='feedback'>
                <label>Feedback for founder B</label>
                <textarea name='feedbackB' onChange={this.onChange} value={this.state.feedbackB} />
              </div>
            </div>
            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

Vote.propTypes = {
  castVote: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  console.log('stateVote', state);

  return {
    logs: state.firestore.data.logs,
  };
};

export default compose(
  firestoreConnect([{ collection: 'logs' }]),
  connect(mapStateToProps),
  connect(null, { castVote }),
)(Vote);
