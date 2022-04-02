import { Container, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import ImageCard from "./ImageCard";

//set up the styling
const useStyles = makeStyles(() => ({
    displayContainer:{
        display:'flex',
        alignItems:'flex-start',
        justifyContent:'center',
        flexWrap:'wrap',
        rowGap:'5px',
        columnGap:'5px',
        flexGrow:'1',
        padding:'5px',
        overflowY:'auto',
        height:'100%'
    }
}))

const ImageDisplay = () => {

    const classes = useStyles();
    const images = useSelector(state => state.imagesReducer)
    const selectedFilters = useSelector(state => state.selectedFiltersReducer)

    //create a list of all images that have the relevant tags
    //only do this if at least one filter is selected
    let filteredImages = [...images];
    //we filter the images, doing an every(so we can break) on the tags comparing it to the selected filters
    //this currently gives us any img with at least one of the selected tags, possibly we will want
    //to update it so the images shown must match all tags, or maybe add an option to toggle between the two
    if(selectedFilters.length !== 0){
        filteredImages = images.filter(img => {
            return(
                !img.tags.every(tag => {
                    if(selectedFilters.includes(tag)){
                        return false
                    }
                    return true
                })
            );
        });
    };


    return(
        <Container className={classes.displayContainer} maxWidth={false} >
            {filteredImages.map(cur => {
                
                return(
                    <ImageCard img = {cur.name} tags = {cur.tags} key = {cur.name}/>
                )
            })}
        </Container>
    )
}

export default ImageDisplay;