import { Card, CardMedia, Dialog, Typography } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux";
import { closeExpandDialog } from "../actions";

const ExpandedImageDialog = () => {

    const open = useSelector(state => state.dialogReducer).open;
    const img = useSelector(state => state.dialogReducer).img;
    const dispatch = useDispatch();
    
    return(
        <Dialog open = {open} onClose = {() => dispatch(closeExpandDialog())}>
           <Card>
            <Typography variant="h4">
                {img.name}
            </Typography>
            <CardMedia component='img'
                       height='600'
                       image={`https://found-image-backend.herokuapp.com/images/fullsize/${img.name}`}
                       alt = {img}/>
           </Card>
        </Dialog>
    );
};

export default ExpandedImageDialog;