import React, {useEffect, useState} from 'react'

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';
import QRcode from '@material-ui/icons/CropFree';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
        >
        {value === index && (
            <Box p={3}>
            <Typography>{children}</Typography>
            </Box>
        )}
        </div>
    );
}
    
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
    
function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
       'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',  
        width: '40%',
        top: '20%',
        left: 0,  
        right: 0,
        margin: 'auto' 
    },
    button:{
        margin: 'auto'
    }
}));

export default function Payment(props){
    const classes = useStyles();
    const [paymentIsOpen, setPaymentIsOpen] = useState(false);
    const [items, setItems] = useState([]);
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
    setValue(newValue);
    };

    useEffect(()=>{
        setPaymentIsOpen(props.paymentIsOpen)
        setItems(props.items)
    }, [props])

    return(
        <div>
        <Modal open={paymentIsOpen}>
            <Card className={classes.root}>
                <CardContent>
                    <AppBar position="static">
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            variant="fullWidth"
                            aria-label="full width tabs example"
                        >
                            <Tab label="Virtual Wallet" {...a11yProps(0)} />
                            <Tab label="Bank Card" {...a11yProps(1)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        <center>
                        <QRcode style={{ fontSize: 300}}/>
                        </center>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <center>
                            <CreditCardIcon style={{ fontSize: 100}}/>
                            <br/>
                            <TextField id="standard-basic" label="Card Number" />
                            <br/><br/>
                            <TextField id="standard-basic" label="OTP code" variant="standard" />
                        </center>
                    </TabPanel>
                </CardContent>
                <CardActions>
                    <Button variant="contained" color="secondary" className={classes.button} onClick={()=> {
                        axios.post('https://foodcourt-backend.herokuapp.com/orders/add', props.items)
                            .then(res => console.log(res));
                        setPaymentIsOpen(false)
                        alert("Order successfully!")
                        window.location = '/user/customer/' + props.items.customerID
                    }}
                    >
                    Get Payment
                    </Button>
                    <Button variant="contained" color="secondary" className={classes.button} onClick={()=>setPaymentIsOpen(false)}>
                    Cancel
                    </Button>
                </CardActions>
            </Card>
        </Modal>
        </div>
    );
}