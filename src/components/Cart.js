import { Button, Container, makeStyles, Typography } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux";
import { openCheckout } from "../actions";
import CartCard from "./CartCard";

const useStyles = makeStyles((theme) => ({
    cartContainer:{
        position:'relative',
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'center',
        height:'100%',
        width:'300px',
        flexShrink:'0',
        padding:'0',
        backgroundColor:theme.palette.secondary.main,
        [theme.breakpoints.down("md")]:{
            width:'200px'
        },
        [theme.breakpoints.down("sm")]:{
            display:'none'
        }
    },
    cartHeader:{
        padding:'0'
    },
    cartItemsContainer:{
        position:'relative',
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'center',
        rowGap:'5px',
        columnGap: '5px',
        width:'100%',
        height:'100%',
        overflowY:'auto',
    },
    reviewButton:{
        width:'90%'

    }
}));


const Cart = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cartReducer);
    const itemsInCart = cart.items;

    return(
        <Container className = {classes.cartContainer}>
            <Container className = {classes.cartHeader}>
                <Typography variant="h6">
                    My Order
                </Typography>
                <Typography variant="body1">
                    Total Postcards: {cart.postcardTotal}
                </Typography>
            </Container>

            <Container className={classes.cartItemsContainer} maxWidth={false}>
                {/* for each item in the cart create a card */}
                {Object.keys(itemsInCart).map(cur => {
                    return <CartCard img = {cur} qty = {itemsInCart[cur]} key = {cur + 'cart'}/>
                })}
            </Container>
            <Button variant="contained" 
                    className = {classes.reviewButton}
                    color="primary"
                    onClick = {() => dispatch(openCheckout())}>
                Review
            </Button>
        </Container>
    )
}

export default Cart;