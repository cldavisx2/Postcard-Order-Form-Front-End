///////////////////////////////////////////
//         IMAGES ACTIONS
export const initImages = images => {
    //takes in an array
    return{
        type: 'INITIMAGES',
        payload:images
    };
};

/////////////////////////////////////////
//        FILTERS ACTIONS
export const initFilters = filters => {
    //takes in an array
    return{
        type: 'INITFILTERS',
        payload: filters
    };
};

export const addFilters = filter => {
    //takes in a string
    return{
        type: 'ADDFILTER',
        payload: filter
    };
};

export const removeFilter = filter => {
    //takes in a string
    return{
        type: 'REMOVEFILTER',
        payload: filter
    };
};

////////////////////////////////////////////
//       SELECTED FILTERS ACTIONS
export const selectFilter = filter => {
    //takes in a string
    return{
        type: 'SELECTFILTER',
        payload: filter
    };
};

export const unselectFilter = filter => {
    //takes in a string
    return{
        type: 'UNSELECTFILTER',
        payload: filter
    };
};

export const clearSelectedFilters = () => {
    return{
        type: 'CLEARSELECTEDFILTERS'
    };
};

////////////////////////////////////////////
//         CART ACTIONS                  
export const addToCart = img => {
    //takes in an object {img:imgName,type:type,qty:qty}
    return{
        type: 'ADDTOCART',
        payload: img
    }
}

export const removeFromCart = img => {
    //takes in a string, the name of the img
    return{
        type: 'REMOVEFROMCART',
        payload: img
    }
}

export const updateCart = img => {
    //takes in an object {img:img,newQty:newQty}
    return{
        type: 'UPDATECART',
        payload: img
    }
}

//////////////////////////////////////////////////////
////        EXPAND DIALOG ACTIONS
export const setDialogImage = img => {
    //takes in an object, {img:img,tags:[tags]}
    return{
        type: 'SETDIALOGIMAGE',
        payload: img
    }
}

export const openExpandDialog = () => {
    return{
        type: 'OPENEXPANDDIALOG'
    }
}

export const closeExpandDialog = () => {
    return{
        type: 'CLOSEEXPANDDIALOG'
    }
}


////////////////////////////////////////////////////////
/////     CHECKOUT ACTIONS
export const openCheckout = () => {
    return{
        type:'OPENCHECKOUT'
    }
}

export const closeCheckout = () => {
    return{
        type:'CLOSECHECKOUT'
    }
}