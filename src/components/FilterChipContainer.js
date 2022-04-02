import { Chip, Container, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { selectFilter, unselectFilter } from "../actions";

//set up our styling
const useStyles = makeStyles((theme) => ({
    filterContainer:{
        display:'flex',
        width:'100%',
        flexWrap:'wrap',
        padding:'0',
        justifyContent:'center',
        alignItems:'center',
        columnGap:'5px',
        rowGap:'5px'
    },
    chipNotSelected:{
        padding:'0 10px 0 9px'
    }
}));


const FilterChipContainer = () => {
    //get our classes for styling
    const classes = useStyles();

    //get our filters from REDUX
    const filters = useSelector(state => state.filterReducer);
    const selectedFilters = useSelector(state => state.selectedFiltersReducer);
    const dispatch = useDispatch()

    return(
        /* create a chip for each filter, 
        conditionally show add and delete icons based on if it's selected */
        <Container className={classes.filterContainer} maxWidth={false}>
        {filters.map(cur => {
            return(<Chip variant={selectedFilters.includes(cur) ? "default" : "outlined"} 
                         onDelete = {selectedFilters.includes(cur) ? () => dispatch(unselectFilter(cur)) : null}
                        //  if the chip is not selected add some padding so it stays the same size
                         className = {selectedFilters.includes(cur) ? null : classes.chipNotSelected}
                         key = {cur} 
                         onClick = {() => dispatch(selectFilter(cur))}
                         label = {cur }/>
            )})}  
        </Container>
    )
}

export default FilterChipContainer;