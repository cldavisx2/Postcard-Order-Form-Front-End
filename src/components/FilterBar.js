import { Container, makeStyles, Typography, Icon, Box, IconButton, Tooltip } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedFilters } from "../actions";
import FilterChipContainer from "./FilterChipContainer";

//set up some styling
const useStyles = makeStyles((theme) => ({
    filterContainer:{
        position:'relative',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        height:'100%',
        width:'200px',
        flexShrink:'0',
        backgroundColor:theme.palette.primary.main,
        padding:'0',
        overflowY:'scroll'
    },
    filterHead:{
        display:'flex',
        width:'100%',
        height:'40px',
        justifyContent:'center',
        alignItems:'center'
    },
    clearButton:{
        position:'absolute',
        top:'3px',
        right:'5px'
    }
}));


const FilterBar = () => {
    //get our classes for styling
    const classes = useStyles();

    //get stuff from REDUX
    const selectedFilters = useSelector(state => state.selectedFiltersReducer);
    const dispatch = useDispatch()

    return(
        <Container className={classes.filterContainer} maxWidth={false}>
            <Box className={classes.filterHead}>
                <Typography variant = 'h6'>Filters</Typography>
                {/* show the clear button only if at least one filter is selected */}
                {selectedFilters.length > 0 ?
                    <Tooltip title = "Clear All" placement="right" arrow>
                        <IconButton aria-label="clear" 
                                    size="small"
                                    className={classes.clearButton}
                                    onClick={() => dispatch(clearSelectedFilters())}>
                            <Icon>delete</Icon>
                        </IconButton>
                    </Tooltip>
                :
                    null}
            </Box>
            <FilterChipContainer/> 
        </Container>
    )
}

export default FilterBar;