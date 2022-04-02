const dialogReducer = (state = {open:false,img:{name:'',tags:[]}},action) => {
    switch(action.type) {
        case 'SETDIALOGIMAGE':
            return {...state,img:action.payload}
        case 'OPENEXPANDDIALOG':
            return {...state,open:true}
        case 'CLOSEEXPANDDIALOG':
            return {...state,open:false}
        default:
            return state
    }
}

export default dialogReducer