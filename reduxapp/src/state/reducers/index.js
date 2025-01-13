import { combineReducers } from 'redux';
import amount from './amount';


const reducers = combineReducers({
    amount: amount,
})

export default reducers;