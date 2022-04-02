import { Card, CardMedia, Container, Icon, IconButton, makeStyles, Typography } from "@material-ui/core"
import { useDispatch } from "react-redux";
import { removeFromCart, updateCart } from "../actions";

const useStyles = makeStyles((theme) => ({
    card:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        flexShrink:'0'
    },
    buttonContainer:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }
}))

const CartCard = ({ img, qty }) => {
    //get the image name without the type
    const imgName = img.split('?')[0];
    const dispatch = useDispatch();
    const classes = useStyles();

    return(
        <Card className={classes.card}>
            {img}
            <IconButton aria-label="remove from cart" size = "small" onClick = {() => dispatch(removeFromCart(img))}>
                <Icon>delete</Icon>
            </IconButton>
            <CardMedia
                component='img'
                height='75'
                image={`https://found-image-backend.herokuapp.com/images/thumbnails/${imgName}`}
                alt = {imgName}/>
            <Container className={classes.buttonContainer}>
                <IconButton aria-label = "decrease qty" 
                            size = "small" 
                            onClick = {() => dispatch(updateCart({img:img,newQty:Math.max(20,qty-10)}))}>
                    <Icon  >remove_circle_outline</Icon>
                </IconButton>
                <Typography>{qty}</Typography>
                <IconButton aria-label = "increase qty" 
                            size = "small" 
                            onClick = {() => dispatch(updateCart({img:img,newQty:qty+10}))}>
                    <Icon>add_circle_outline</Icon>
                </IconButton >
            </Container>
        </Card>
    )
}

export default CartCard;