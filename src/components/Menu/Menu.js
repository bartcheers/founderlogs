import React, { Component } from 'react';
import Leaderboard from '../Leaderboard/Leaderboard';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setActiveView } from '../../actions/menuActions.js';
import './menu.scss';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeView: 0,
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    this.setState({ activeView: JSON.parse(e.target.value) });
    this.props.setActiveView(JSON.parse(e.target.value));
  }

  render() {
    const { activeView } = this.props;

    return (
      <div className='vertical'>
        <div className='modal menu'>
          <h2>Menu</h2>
          <label>Every Sunday:</label>
          <button value='0' onClick={this.onClick}>
            Log {activeView === 0 ? '>' : ''}
          </button>
          <br />
          <br />
          <label>Every Monday:</label>
          <button value='1' onClick={this.onClick}>
            Vote {activeView === 1 ? '>' : ''}
          </button>
        </div>
        <div className='modal menu'>
          <h2>Why FounderLogs?</h2>
          <ul>
            <li>Earn pay outs</li>
            <li>Get feedback</li>
            <li>Filter ideas</li>
          </ul>
        </div>
        <Leaderboard />
      </div>
    );
  }
}

Menu.propTypes = {
  setActiveView: PropTypes.func.isRequired,
  activeView: PropTypes.number.isRequired,
};

const mapStateToProps = state => {
  return {
    activeView: state.menu,
  };
};

export default connect(mapStateToProps, { setActiveView })(Menu);
