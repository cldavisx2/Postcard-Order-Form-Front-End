//and image is an object like so: {name:'NY-000001',tags:['New York']}
const imagesReducer = (state = [],action) => {
    switch(action.type){
        case 'INITIMAGES':
            return action.payload
        default:
            return state;
    }
}

export default imagesReducer;