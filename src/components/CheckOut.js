import { Box, Button, Container, Icon, makeStyles, TextField, Typography } from "@material-ui/core"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeCheckout } from "../actions";
import CartCard from "./CartCard";
// import axios from "axios";

const useStyles = makeStyles((theme) => ({
    checkOutBackground:{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'bisque'
    },
    checkOutContainer:{
        position:'relative',
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'center',
        width: '95%',
        height: '95%',
        backgroundColor: 'ivory',
        borderRadius: '20px',
        padding:'10px'
    },
    backButton:{
        position:'absolute',
        top:'10px',
        right:'10px',
        height:'40px',
        width:'40px',
        minWidth:'0'
    },
    itemContainer:{
        display:'flex',
        justifyContent:'center',
        alignItems:'flex-start',
        rowGap:'5px',
        columnGap:'5px',
        width:'100%',
        height:'80%',
        flexWrap:'wrap',
        padding:'10px',
        backgroundColor:'cornsilk',
        borderRadius:'10px',
        overflowY:'auto'
    },
    checkOutButtonsContainer:{
        width:'100%',
        display:'flex',
        justifyContent:'center',
        columnGap:'20px'
    }
}))

const CheckOut = () => {

    const classes = useStyles();
    const cart = useSelector(state => state.cartReducer);
    const dispatch = useDispatch()
    const itemsInCart = cart.items;

    const onGenerateXLS = () => {
        //send our cart object to the backend along with the order number
        //but only do this if the order number exists and is the correct format
        //will also want to ask if the order is empty...
        let numItemsInCart = Object.keys(itemsInCart).length
        if((orderValid) && (orderNumber !== '') && (numItemsInCart !== 0)){
            //create the cart object we will send to the server
            const myCart = {orderNumber:orderNumber,items:itemsInCart}  
            //Tried this with axios but couldnt get it to work, will make another attempt
            //Make the post request, then download the returned xlsx file
            fetch("https://found-image-backend.herokuapp.com/get-xls",{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(myCart)
            }).then(response => response.blob())
            .then(blob => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${orderNumber}.xlsx`;
                a.click();
            })
        }
        else{
            //we will want to put some sort of alert/notification here
        }
    }

    //keep track of the order number and if it's valid
    const [orderValid,setOrderValid] = useState(true)
    const [orderNumber,setOrderNumber] = useState('')
    const onOrderChange = e => {
        validateOrderNumber(e.target.value);
        setOrderNumber(e.target.value);
    }
    //verify the order number is in the proper form
    const validateOrderNumber = val => {
        //order number should be in the form 4802-123456
        let x = val;
        x = x.split('-');
        //is there 1 and only 1 '-'
        if(x.length !== 2){
            setOrderValid(false)
            return
        }
        //are there 4 numbers on the left and 6 on the right
        if((x[0].length !== 4) || (x[1].length !== 6)){
            setOrderValid(false)
            return
        }
        //are the chars in each numeric, useing regex
        if((!/^\d+$/.test(x[0])) || (!/^\d+$/.test(x[1]))){
            console.log('not a number')
            setOrderValid(false)
            return
        }
        //if we get to this point the order number has been validated
        setOrderValid(true)
    }

    return(
        <Box className={classes.checkOutBackground}>
            <Container className={classes.checkOutContainer}>
                <Typography variant="h4">
                    Review Order
                </Typography>
                <TextField id="order-number" 
                           label="Order Number"
                           placeholder = "Ex: 4802-123456" 
                           variant="outlined" 
                           size = "small"
                           onChange = {onOrderChange}
                           error = {!orderValid}
                           helperText={orderValid ? '': 'Invalid Order Number'}/>
                <Typography variant="body1">
                    Postcards: {cart.postcardTotal}
                </Typography>
                <Button variant='contained' className={classes.backButton} onClick = {() => dispatch(closeCheckout())}>
                    <Icon>arrow_back</Icon>
                </Button>
                <Container className={classes.itemContainer}>
                    {Object.keys(itemsInCart).map(cur => {
                        return <CartCard img = {cur} qty = {itemsInCart[cur]} key = {cur + 'checkout'}/>
                    })}
                </Container>
                <Container className={classes.checkOutButtonsContainer}>
                    <Button variant = 'outlined' onClick = {() => dispatch(closeCheckout())}>
                        Add Items
                    </Button>
                    <Button variant = 'outlined' onClick = {onGenerateXLS}>
                        Generate Order Form
                    </Button>
                </Container>
            </Container>
        </Box>
    );
};


export default CheckOut