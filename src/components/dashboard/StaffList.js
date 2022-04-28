import "./StaffList.css";

import React, { useEffect, useState } from "react";

import { AddCircleOutline } from "@material-ui/icons";
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from "@material-ui/core/Grid";
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import ManageStaff from './ManageStaff'
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import axios from 'axios'

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

function Persona(props) {
  return (
    <div>
      <ul>
        <li className="card__list avatar--image">
          <img src={props.info.imgUrl ? props.info.imgUrl :"https://cdn.onlinewebfonts.com/svg/img_454474.png"} alt="staff" />
        </li>
        <li className="card__list text--primary">{props.info.name}</li>
        <li className="card__list text--small">{props.info.role}</li>
      </ul>
      <button
        type="button"
        className="close"
        onClick={() => {
			axios.delete('https://foodcourt-backend.herokuapp.com/staff/delete/'+props.info._id)
            .then(response => { 
				console.log(response.data)
				props.handleClose(prev => !prev)
			});
          
        }}
      >
        &times;
      </button>
			<div 
				style={{
					"display": "flex", 
					"align-items": "center", 
					"justify-content": "center"
				}}
			>
				<Button 
					onClick={() => {
						props.handleSelectStaff(props.info)
						props.handleClose(prev => !prev)
					}}
					color="primary" 
					variant="text"
				>
					Edit
				</Button>
			</div>
    </div>
  );
}

function StaffList() {
  const res = [
    {"_id":{"$oid":"5ee5ff90dc6eac1874a45629"},"name":"Nguyễn Văn A","email":"a@gmail.com","idNumber":"13445611","age":{"$numberInt":"20"},"phoneNumber":"134662632","gender":"male","role":"Waiter","createdAt":{"$date":{"$numberLong":"1592131472594"}},"updatedAt":{"$date":{"$numberLong":"1592131472594"}},"__v":{"$numberInt":"0"}},
    {"_id":{"$oid":"5ee600addc6eac1874a4562e"},"name":"Nguyen Van B","email":"b@gmail.com","idNumber":"154252623","age":{"$numberInt":"23"},"phoneNumber":"04453262","gender":"male","role":"Waiter","createdAt":{"$date":{"$numberLong":"1592131757484"}},"updatedAt":{"$date":{"$numberLong":"1592131757484"}},"__v":{"$numberInt":"0"}},
    {"_id":{"$oid":"5ee6020ac659d00f60600993"},"name":"John","email":"john@gmail.com","idNumber":"142525326","age":{"$numberInt":"20"},"phoneNumber":"013425255","gender":"male","role":"Waiter","createdAt":{"$date":{"$numberLong":"1592132106875"}},"updatedAt":{"$date":{"$numberLong":"1592132106875"}},"__v":{"$numberInt":"0"}}
  ]
  const [data, setData] = useState([]);
  const [displayItems, setDisplayItems] = useState();
  const [isEdit, setIsEdit] = useState(false)
	const [currentStaff, setCurrentStaff] = useState({})
	const [refresh, setRefresh] = useState(false)
	const [search, setSearch] = useState("")

  const handleSelectStaff = (item) => {
    setCurrentStaff(item)
	}
	
	useEffect(() => {
    async function load() {
      const res = await axios.get('https://foodcourt-backend.herokuapp.com/staff/')
      setData(res.data)
      console.log(res)
    }
    load()
	},[refresh])
	
	const handleChange = (e) => {
		let resultItems = []
		let searchString =  e.target.value.toLowerCase();
		if( searchString ) {
			resultItems = data.filter(item => {
				if(item.name.toLowerCase().search(searchString) !== -1 ) {
					return item
				}
			})
			console.log(items)
		} else {
			resultItems = data;
		}
		var items = resultItems.map(item => 
			<div className="card__container" key={data.key}>
				<div className="card__content">
					<Persona info={item} handleSelectStaff={handleSelectStaff} handleClose={() => {setRefresh(prev => !prev);}}/>
				</div>
			</div>
		);
		setDisplayItems(items);
	}

  useEffect(() => {
    var items = data.map(item => 
        <div className="card__container" key={data.key}>
          <div className="card__content">
            <Persona info={item} handleSelectStaff={handleSelectStaff} handleClose={() => {setRefresh(prev => !prev);}}/>
          </div>
        </div>
    );
    setDisplayItems(items);
  }, [data])

  const handleClose = () => {
	setIsEdit(prev => !prev);
	setRefresh(prev => !prev);
  }
  return(
    <Grid container className="wrapper">
			<Grid item xs={12} sm={isEdit ? 8 : 12}>
				<div className="content-wrapper">
					<div className="tally">
						<Grid container>
							<Grid item xs>
								<h1 style={{"font-weight": "bold", "font-size": "30px"}} className="app-title">
									<span className="number-primary">{data.length}</span>Staff
											{data.length === 1 ? "" : "s"}
								</h1>
								<div className="category">
									{" "}Cook:
									<span className="focus">
										{data.filter(staff => staff.role === 'cook').length}
									</span>
								</div>
								<div className="category">
									{" "}Vendor:
									<span className="focus">
										{/*count the number of vendor in data*/}
									</span>
								</div>
								<div className="category">
									{" "}Manager:
									<span className="focus">
										{/*count the number of cook in data*/}
										{data.filter(staff => staff.role === 'manager').length}
									</span>
								</div>
							</Grid>
							<Grid item xs>
								<Input
									id="input-with-icon-adornment"
									startAdornment={
										<InputAdornment position="start">
											<SearchIcon />
										</InputAdornment>
									}
									endAdornment={
										<InputAdornment position="end">
											<AddCircleOutline onClick={() =>{
												 setIsEdit(true);
												 setCurrentStaff(null)
											}}/>
										</InputAdornment>
									}
									onChange = {handleChange}

								/>
							</Grid>
							<Grid item xs>
								<Button 
									color="primary" 
									variant="contained"
									onClick={() => {
										setRefresh(prev => !prev)
									}}
								>
									Reset
								</Button>
							</Grid>
						</Grid>
					</div>
					<ReactCSSTransitionGroup
							transitionName="example"
							transitionAppear={true}
							className="card__wrapper"
					>
						{displayItems}
					</ReactCSSTransitionGroup>
				</div>
			</Grid>
			{isEdit && <Grid item sm={4} style={{display: isEdit ? "" : "none"}}>
        <ManageStaff info={currentStaff} handleClose={handleClose}/>
      </Grid>}
    </Grid>
  )
}

export default StaffList;