import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Axios from 'axios' 
import { unstable_batchUpdates } from 'react-dom'
import Payment from './PaymentUI'

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',  
        width: '30%',
        top: '30%',
        left: 0,  
        right: 0,
        margin: 'auto' 
    },
    inner: {
        position: 'absolute',  
        left: '25%',  
        right: '25%',  
        top: '25%',  
        bottom: '25%',  
        margin: 'auto'
    },
    button:{
        margin: 'auto'
    }
}));

export default function ConfirmModal(props){
    const classes = useStyles();
    const [confirmIsOpen, setConfirmIsOpen] = useState(false);
    const [items, setItems] = useState([])
    const [payment, setPayment] = useState([])
    useEffect(()=>{
        setConfirmIsOpen(props.confirmIsOpen)
        setItems(props.items)
    }, [props])

    return(
        <div>
        <Modal open={confirmIsOpen}>
        <Card className={classes.root}>
            <CardContent>
                <Typography align="center" variant="h5" >
                    Do you confirm this order?
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" color="secondary" className={classes.button} onClick={() =>{
                    setPayment(<Payment items={props.items} paymentIsOpen={true}/>);
                    setConfirmIsOpen(false);
                }}
                >
                Yes
                </Button>
                <Button variant="contained" color="secondary" className={classes.button} onClick={()=>{
                    setConfirmIsOpen(false);
                    setPayment(null);
                }}>
                No
                </Button>
            </CardActions>
        </Card>
        </Modal>
        {payment}
        </div>
    );
}
