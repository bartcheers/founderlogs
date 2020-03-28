import { createLogDB } from '../db';

export const createLog = logData => {
  return () => {
    createLogDB(logData);
  };
};
