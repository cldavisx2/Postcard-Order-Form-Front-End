import { AppBar, Container, Icon, IconButton, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { openCheckout } from "../actions";

//set up our styling
const useStyles = makeStyles((theme) => ({
    appBar:{
      display:'flex',
      justifyContent:'center',
      height:'64px'
    },
    searchImg:{
      marginRight:theme.spacing(1)
    },
    logo:{
      display:'flex',
      alignItems:'center'
    },
    cartButton:{
      [theme.breakpoints.up('md')]:{
        display:'none'
      }
    }
}));


const NavBar = () => {

    const classes = useStyles()
    const dispatch = useDispatch();
    const checkOutOpen = useSelector(state => state.checkOutReducer).open

    //only display the checkout button if the checkout is not open
    const checkOutButton = () => {
      if(!checkOutOpen){
        return(
            <IconButton aria-label="review order" 
                        className = {classes.cartButton} 
                        onClick = {() => dispatch(openCheckout())}>
              <Icon>shopping_cart</Icon>
            </IconButton>
        )
      }
      else{
        return null
      }
    }

    return(
        <AppBar position = "static" 
                color = "primary" 
                className = {classes.appBar}>
          <Toolbar>
            <Container className={classes.logo}>
              <Icon className={classes.searchImg}>search</Icon>
              <Typography variant = "h6">
                Found Image Order Form 
              </Typography>
            </Container>
            {checkOutButton()}
          </Toolbar>  
        </AppBar>
    )
}

export default NavBar;