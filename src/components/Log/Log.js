import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createLog } from '../../actions/logActions.js';
import './log.scss';

class Log extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reminder: '',
      completed: '',
      planned: '',
      buyIn: 0,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const log = {
      reminder: this.state.reminder,
      completed: this.state.completed,
      planned: this.state.planned,
      buyIn: this.state.buyIn * 10,
      timestamp: Date.now(),
      votersFor: [],
      votersAgainst: [],
      feedback: [],
    };

    this.props.createLog(log);
  }

  render() {
    return (
      <div className='update-form modal'>
        <h2>Weekly Log</h2>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Quick reminder: what are you building?</label>
            <textarea
              className='one-line'
              name='reminder'
              onChange={this.onChange}
              value={this.state.reminder}
            />
          </div>
          <div>
            <label>What did you do this week?</label>
            <textarea name='completed' onChange={this.onChange} value={this.state.completed} />
          </div>
          <div>
            <label>What are you planning to do next week?</label>
            <textarea name='planned' onChange={this.onChange} value={this.state.planned} />
          </div>
          <label>Buy in: ${this.state.buyIn * 10}</label>
          <input
            type='range'
            min='0'
            max='10'
            name='buyIn'
            value={this.state.buyIn}
            onChange={this.onChange}
          />
          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}

Log.propTypes = {
  createLog: PropTypes.func.isRequired,
};

export default connect(null, { createLog })(Log);
