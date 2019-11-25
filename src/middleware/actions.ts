import * as actions from '../actions';
import { Action } from '../actions/types';
const keys: Array<string> = Object.keys(actions);

const enhanceActions = (
  state: Function,
  dispatch: React.Dispatch<Action>
): Record<string, Function> => {
  let enhanced: Record<string, Function> = {};
  keys.forEach(action => {
    const actionCreator: Function = actions[action];
    enhanced[action] = actionCreator(state, dispatch);
  });
  return enhanced;
};

export { enhanceActions };
