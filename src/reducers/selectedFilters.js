//Reducer for the selected filters
const selectedFiltersReducer = (state = [], action) => {
    switch(action.type){
        case 'SELECTFILTER':
            //add the new filter, but only if it's not already selected
            if(!state.includes(action.payload))
                return [...state,action.payload];
            return state
        case 'UNSELECTFILTER':
            return state.filter(cur => cur !== action.payload);
        case 'CLEARSELECTEDFILTERS':
            return [];
        default:
            return state;
    };
};

export default selectedFiltersReducer;