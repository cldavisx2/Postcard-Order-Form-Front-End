import { combineReducers } from 'redux';
import filterReducer from './filters';
import selectedFiltersReducer from './selectedFilters';
import imagesReducer from './images';
import cartReducer from './cart';
import dialogReducer from './dialog';
import checkOutReducer from './checkout';

//combine all our reducers into one 
const allReducers = combineReducers({
    //can rename them like so counter : counterReducer, cut there's no real need
    filterReducer,
    selectedFiltersReducer,
    imagesReducer,
    cartReducer,
    dialogReducer,
    checkOutReducer
})

export default allReducers;

