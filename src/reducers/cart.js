//The cart is an object in the form {postcardTotal:total,items:{ImgName?Type: QTY}}
//Items Example: {NY-000001?postcard:20,NY-000003?notecard:30}

const addToCard = (state,img,type,qty) => {
    //if it's in the cart don't add it
    if(!state.items[`${img}?${type}`]){
        let newState = {...state}
        //add the new image
        newState.items[`${img}?${type}`] = qty
        //update the total qty
        newState.postcardTotal += qty
        return newState
    }
        //probably want to launch a notification saying the item is already in the cart here
        return state
}

const removeFromCart = (state, img) => {
    let newState = {...state}
    //update total qty
    newState.postcardTotal -= newState.items[img]
    //remove the item
    delete newState.items[img]
    return newState
}

const updateCart = (state, img, newQty) => {
    let newState = {...state}
    //calculate by how much the total qty should be adjusted
    const qtyToAdjust = newQty - newState.items[img]
    newState.postcardTotal += qtyToAdjust
    //update the item qty
    newState.items[img] = newQty
    return newState
}


const cartReducer = (state = {postcardTotal:0,items:{}}, action) => {
    switch(action.type){
        case 'ADDTOCART':
            //takes in an object {IMG:img,type:type,qty:qty}
            return addToCard(state,action.payload.img,action.payload.type,action.payload.qty)
        case 'REMOVEFROMCART':
            //payload is simply the img as it appears in the key of the cart object
            return removeFromCart(state, action.payload)
        case 'UPDATECART':
            //payload is an object with the imgName and the new qty
            return updateCart(state, action.payload.img, action.payload.newQty)
        default:
            return state
    }
}

export default cartReducer;