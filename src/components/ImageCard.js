import { Button, Card, CardMedia, Container, Icon, IconButton, makeStyles, Typography } from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, openExpandDialog, setDialogImage } from "../actions";

const useStyles = makeStyles((theme) => ({
    imageCard:{
        position:'relative',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        height:'200px',
        padding:theme.spacing(1)
    },
    hoverContainer:{
        position:'absolute',
        height:'100%',
        width:'100%',
        padding:'0',
        borderWidth:theme.spacing(1),
        borderColor:'rgba(0,0,0,0)',
        borderStyle:'solid'
    },
    hoverHeader:{
        position:'absolute',
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%',
        padding:'5px 5px',
    },
    headerTitle:{
        position:'relative',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:'auto',
        padding:'2px 5px',
        margin:'0',
        userSelect:'none'
    },
    headerText:{
        zIndex:'10'
    },
    titleBg:{
        position:'absolute',
        width:'100%',
        height:'100%',
        backgroundColor:'white',
        opacity:'.7',
        borderRadius:'5px'
    },
    expandButton:{
        backgroundColor:'white',
        top:'0',
        right:'0'
    },
    addCardContainer:{
        position:'absolute',
        bottom:'0',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        padding:'5px 0'
    },
    addCardContainerBg:{
        position:'absolute',
        backgroundColor:'white',
        opacity:'.7',
        width:'100%',
        height:'100%',
    },
    buttonContainer:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        zIndex:'10'
    },
    cardImage:{
        height:'100%',
        width:'auto'
    }
}))

const ImageCard = ({ img, tags }) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    //keep track of the qty to add to the cart1
    const [qtyToAdd,setQtyToAdd] = useState(20);

    //called when either + or - buttons are clicked, updates the qtyToAdd state
    const handleQty = qty => {
        //don't let the qty go below 20, as that is the minimum order
        let newQty = Math.max(20,qtyToAdd + qty);
        setQtyToAdd(newQty);
    }

    const handleExpand = () => {
        //set the image to be displayed in the dialog then open it
        dispatch(setDialogImage({name:img,tags:tags}))
        dispatch(openExpandDialog())
    }

    //conditionally render info/buttons on hover
    const [isHovered,setIsHovered] = useState(false);
    //handle mouse enter/leave from the image card
    const onMouseEnter = () => setIsHovered(true);
    const onMouseLeave = () => {
        setIsHovered(false);
        //set qty back to intital value
        setQtyToAdd(20);
    }
    const hoverContainer = () => {
        if (isHovered){
            return(
                <Container className={classes.hoverContainer}>
                    <Container className = {classes.hoverHeader}>
                        <Container className = {classes.headerTitle}>
                            <Container className = {classes.titleBg}/>
                            <Typography className={classes.headerText}>
                                {img}
                            </Typography>
                        </Container>
                        <IconButton aria-label="expand image"
                                    size = "small"  
                                    className = {classes.expandButton} 
                                    onClick={handleExpand}>
                            <Icon>open_in_full</Icon>
                        </IconButton>
                    </Container>
                    <Container className={classes.addCardContainer}>
                        <Container className={classes.addCardContainerBg}/>
                        <Container className = {classes.buttonContainer}>
                            <IconButton aria-label = "decrease qty" size = "small" onClick = {() => handleQty(-10)}>
                                <Icon>remove_circle_outline</Icon>
                            </IconButton>
                            <Typography>{qtyToAdd}</Typography>
                            <IconButton aria-label = "increase qty" size = "small" onClick = {() => handleQty(10)}>
                                <Icon>add_circle_outline</Icon>
                            </IconButton >
                        </Container>
                        <Button variant="contained" 
                                size = 'small' 
                                onClick = {() => dispatch(addToCart({img:img,type:'postcard',qty:qtyToAdd}))}>
                            ADD
                        </Button>
                    </Container>
                </Container>
            )
        }
        return null
    }

    return(
        <Card className={classes.imageCard} 
              onMouseEnter = {onMouseEnter}
              onMouseLeave = {onMouseLeave}>
            <CardMedia component='img'
                       image={`https://found-image-backend.herokuapp.com/images/thumbnails/${img}`}
                       alt = {img}
                       className = {classes.cardImage}/>
            {hoverContainer()}
        </Card>
    )
}

export default ImageCard;