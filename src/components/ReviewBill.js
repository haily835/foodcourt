import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';
import {thousands_separators} from './itemList/CheckList.compoment'
import Modal from '@material-ui/core/Modal';
import Axios from 'axios' 


const useStyles = makeStyles({
    root: {
        position: 'fixed',  
        width: '30%',
        top: '15%',
        left: 0,  
        right: 0,
        margin: 'auto' 
    },
    table: {
        minWidth: '100%'
    },
});

export default function ReviewBill(props){
    const classes = useStyles();
    const [billIsOpen, setBillIsOpen] = useState(false);
    const [items, setItems] = useState([])
    let cur = new Date();
    let total = 0;
    for (let index = 0; index < items.length; index++) {
        total += items[index].price * items[index].number;
    }
    useEffect(()=>{
        setBillIsOpen(props.billIsOpen)
        setItems(props.items)
    }, [props])
    return(
        <div>
        <Modal open={billIsOpen}>
        <Card className={classes.root}>
            <CardContent>
                <Typography align="center" variant="h5" >
                    BK Food Court
                </Typography>
                <Typography  variant="body2" color="initial">
                <center>
                268 Ly Thuong Kiet, P.14, Q.10<br/>
                ---------------------------------------
                </center>
                ID: {props.id}<br/>
                Time: {cur.toDateString()}
                <center>---------------------------------------</center>
                <TableContainer>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name </TableCell>
                                <TableCell align="right">Number&nbsp;</TableCell>
                                <TableCell align="right">Price&nbsp;</TableCell>
                                <TableCell align="right">Total&nbsp;</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((item) => (
                                <TableRow key={item._id}>
                                    <TableCell>{item.name} </TableCell>
                                    <TableCell align="right">{item.number}</TableCell>
                                    <TableCell align="right">{thousands_separators(item.price)}</TableCell>
                                    <TableCell align="right">{thousands_separators(item.number * item.price)}</TableCell>     
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell><h3><b>Total</b></h3></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell align="right"><h3><b>{thousands_separators(total)}</b></h3></TableCell>
                                </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                </Typography> 
            </CardContent>
            <CardActions>
                <Button variant="contained" color="secondary" margin="auto" onClick={()=>setBillIsOpen(false)}>
                Cancel
                </Button>
            </CardActions>
        </Card>
        </Modal>
        </div>
    );
}