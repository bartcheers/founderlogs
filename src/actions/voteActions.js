import { updateWinningLogDB, updateLosingLogDB } from '../db';

export const castVote = voteData => {
  return () => {
    updateWinningLogDB(voteData.voteFor);
    updateLosingLogDB(voteData.voteAgainst);
  };
};
