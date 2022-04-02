import { useDispatch, useSelector } from 'react-redux';
import { initFilters, initImages } from './actions'
import { Box, Container, makeStyles, ThemeProvider } from '@material-ui/core';
import { theme } from "./theme";
import NavBar from './components/NavBar';
import FilterBar from './components/FilterBar';
import Cart from './components/Cart';
import { useEffect } from 'react';
import ImageDisplay from './components/ImageDisplay';
import ExpandedImageDialog from './components/ExpandedImageDialog';
import CheckOut from './components/CheckOut';
import axios from 'axios';

//set up some styling
const useStyles = makeStyles((theme) => ({
  page:{
    display:'flex',
    flexDirection:'column',
    width:'100%',
    height:'100vh'
  },
  mainPageContainer:{
    display:'flex',
    flexGrow:'1',
    justifyContent:'space-between',
    padding:'0',
    height:'calc(100vh - 64px)'
  }
}));

function App() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const checkOutOpen = useSelector(state => state.checkOutReducer).open;

  useEffect(() => {
    //when the app initializes get our list of images and filters and set the state
    const baseURL = 'https://found-image-backend.herokuapp.com'
    //get the list of images
    axios.get(`${baseURL}/get-images`)
         .then((response) => {
           dispatch(initImages(response.data));
         })
    //get the list of tags/filters
    axios.get(`${baseURL}/get-tags`)
         .then((response) => {
           dispatch(initFilters(response.data));
         })
  
  },[]);// eslint-disable-line react-hooks/exhaustive-deps

  //if the checkout is open display it, otherwise display the filters,imgs, and cart
  const mainContentArea = () => {
    const checkoutOpen = checkOutOpen;
    if(checkoutOpen){
      return <CheckOut/>
    }
    else{
      return(
        <Container maxWidth={false} className={classes.mainPageContainer}>
          <FilterBar/>  
          <ImageDisplay/>
          <Cart/>  
        </Container>
      )
    }
  }

  return (
      <ThemeProvider theme = {theme}>
        <Box className={classes.page}>
          <NavBar/>
          <ExpandedImageDialog/>
          {mainContentArea()}
        </Box>
      </ThemeProvider>
  );
}

export default App;
