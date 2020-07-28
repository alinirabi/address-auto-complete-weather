import { combineReducers } from 'redux';
import { RESET_STATE } from '../ReduxTypes';
import wWeather from '../reducers/weather';


const appReducer = combineReducers({
    weather:wWeather
});

const rootReducer = (state, action) => {
  if (action.type === RESET_STATE) {
    state = { form: state.form };
  }
  return appReducer(state, action);
};

export default rootReducer;
