const filterReducer = (state = [], action) => {
    switch(action.type){
        case 'INITFILTERS':
            return action.payload;
        case 'ADDFILTER':
            return [...state,action.payload];
        case 'REMOVEFILTER':
            return state.filter(cur => cur !== action.payload);
        default:
            return state;
    };
};

export default filterReducer;