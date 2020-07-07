import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Item from './Item.component'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CheckList from './CheckList.compoment';
import Bill from '../ReviewBill';
import Confirm from '../ConfirmModal'
import axios from 'axios';

export function createOrderData(order, cusID) {
    let total = 0;
    order.forEach(item => {total += item.price*item.number})
    let rv = {
        "customerID": cusID,
        "items": order,
        "total": total,
        "status": "New"
    }
    console.log(rv)
    return rv
}

function ItemsList(props) {
    // keep track of clicked item
    const [selectedItems, setSelectedItems] = useState([])
    const [checkList, setCheckList] = useState(null)

    // the object to send to api
    const [orderPostData, setOrderPostData] = useState({});
    const [bill, setBill] = useState(null);
    const [confirm, setConfirm] = useState(null);
    // when customer click a item
    const handleSelect = (item) => {
        setSelectedItems(prevState => {
            prevState.push(item); 
            return prevState
        })
        console.log(selectedItems)
        if(selectedItems.length !== 0 ) {
            const newItem = selectedItems[(selectedItems.length) - 1]
            const newItemId = newItem._id
            const newItemName = newItem.name
            const newItemPrice = newItem.price

            // check if it has been added
            let isAdded = 0
            order.map((item) => {
                if (item._id === newItemId) {
                    item.number += 1
                    isAdded = 1
                }
            })

            // add new item to order if it is not appeared
            if(!isAdded) {
                const newOrderItem = {
                    "_id": newItemId,
                    "name": newItemName,
                    "number": 1,
                    "price": newItemPrice,
                }
    
                setOrder((prev) => {
                    prev.push(newOrderItem)
                    return prev
                })
            }
            setOrderPostData(createOrderData(order, props.customerID))
            setCheckList((<CheckList items={
                createOrderData(order, props.customerID)} 
                handleIncrement={handleIncrement} 
                handleDecrement={handleDecrement}
                handleDelete={handleDelete}
            />))
            console.log(order)
        }
    }

    const handleIncrement = (_item) => { 
        order.map((item) => {
          if(_item._id === item._id){
              item.number++;
          }
            setOrderPostData(createOrderData(order, props.customerID))
            setCheckList((<CheckList 
                items={createOrderData(order, props.customerID)} 
                handleIncrement={handleIncrement} 
                handleDecrement={handleDecrement}
                handleDelete={handleDelete}
            />))
        })
    }

    const handleDecrement = (_item) => {
        order.map((item) => {
          if(_item._id === item._id){
            item.number--;
            if(item.number === 0){
                order.splice(order.indexOf(item), 1)
            }
            setOrderPostData(createOrderData(order, props.customerID))
            setCheckList((<CheckList 
                items={createOrderData(order, props.customerID)} 
                handleIncrement={handleIncrement} 
                handleDecrement={handleDecrement}
                handleDelete={handleDelete}
            />))
          }  
        })
    }

    const handleDelete = (_item) => {
        order.map((item) => {
          if(_item._id === item._id){
            item.number = 0;
            order.splice(order.indexOf(item), 1)
            setOrderPostData(createOrderData(order, props.customerID))
            setCheckList((<CheckList 
                items={createOrderData(order, props.customerID)} 
                handleIncrement={handleIncrement} 
                handleDecrement={handleDecrement}
                handleDelete={handleDelete}
            />))
          }  
        })
    }

    // keep track of item in the bill
    const [order, setOrder] = useState([])
    //setOrderPostData(createOrderData(order, props.customerID))
    
    return (
    <div>
    <Grid container>
        <Grid item xs>
            {props.items ? (
                <div>
                    <Grid container spacing={24} style={{ padding: 24 }}>
                        {props.items.map(item => (
                            <Grid key={item._id} item xs={12} sm={6} lg={4} xl={3} style={{ padding: 10 }}>
                                <Item
                                    key={item._id}
                                    info={item}
                                    handleSelect={handleSelect}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            ) : "No items found"}
        </Grid>

        <Grid item xs={4} style={{display: checkList ? "" : "none", paddingTop: 34, marginRight: 24}}>
            {checkList}
            <div style={{display: "flex", "justify-content": "center", "align-items": "center"}}>
                <Button 
                    variant="contained" 
                    color="secondary"
                    onClick={() =>{ 
                        setBill(<Bill items={order} billIsOpen={true} id={null}/>);
                    }}
                >
                    Review 
                </Button>
                {bill}
                <Button 
                    variant="contained" 
                    color="secondary"
                    onClick={()=>{
                        setConfirm(<Confirm items={orderPostData} confirmIsOpen={true}/>);
                        /*axios.post('http://localhost:5000/orders/add', orderPostData)
                            .then(res => console.log(res));
                        setSelectedItems([])
                        setOrder([])
                        setCheckList(null)*/
                    }}
                >
                    Confirm
                </Button>
                {confirm}
            </div>
        </Grid>    
    </Grid>
    </div>
    );
}

export default ItemsList
