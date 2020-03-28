import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { castVote } from '../../actions/voteActions.js';
import './vote.scss';
import { getRandomLogDB } from '../../db';

class Vote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vote: 0,
      feedbackA: '',
      feedbackB: '',
      pickedLogs: [],
    };

    this.onChange = this.onChange.bind(this);
    this.onVote = this.onVote.bind(this);
    this.onToggle = this.onToggle.bind(this);
  }

  async componentDidMount() {
    const logA = await getRandomLogDB();
    const logB = await this.pickLogAvoidDuplicate(logA.id);

    this.setState({ pickedLogs: [logA, logB] });
  }

  async pickLogAvoidDuplicate(dupID) {
    return new Promise(async function cb(resolve, reject) {
      const logB = await getRandomLogDB();

      //avoid duplicate
      if (logB.id === dupID) {
        cb(resolve, reject);
      } else {
        resolve(logB);
      }
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onToggle(e) {
    this.setState({ vote: e.target.checked === true ? 1 : 0 });
  }

  onVote(e) {
    e.preventDefault();

    const vote = {
      voteFor: {
        id: this.state.pickedLogs[this.state.vote].id,
        feedback: this.state.vote === 0 ? this.state.feedbackA : this.state.feedbackB,
      },
      voteAgainst: {
        id: this.state.pickedLogs[1 - this.state.vote].id,
        feedback: this.state.vote === 1 ? this.state.feedbackA : this.state.feedbackB,
      },
    };

    this.props.castVote(vote);
  }

  render() {
    return (
      <div className='vote vertical'>
        <div className='horizontal log-wrap'>
          {this.state.pickedLogs.map((log, index) => {
            return (
              <div className='founder modal' key={index}>
                <h2>
                  Founder {index === 0 ? 'A' : 'B'}{' '}
                  {this.state.vote === index ? <span>- Your pick</span> : null}
                </h2>
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
          {this.state.pickedLogs.length === 0 ? (
            <div className='modal loading'>Loading founder logs...</div>
          ) : (
            ''
          )}
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
                <label>
                  Feedback for founder A {this.state.vote === 0 ? <span>- Your pick</span> : null}
                </label>
                <textarea
                  required
                  name='feedbackA'
                  onChange={this.onChange}
                  value={this.state.feedbackA}
                />
              </div>
              <div className='feedback'>
                <label>
                  Feedback for founder B {this.state.vote === 1 ? <span>- Your pick</span> : null}
                </label>
                <textarea
                  required
                  name='feedbackB'
                  onChange={this.onChange}
                  value={this.state.feedbackB}
                />
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

export default connect(null, { castVote })(Vote);
