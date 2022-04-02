const checkOutReducer = (state = {open:false},action) => {
    switch(action.type){
        case 'OPENCHECKOUT':
            return {...state,open:true}
        case 'CLOSECHECKOUT':
            return {...state,open:false}
        default:
            return state
    };
};

export default checkOutReducer;