import React from 'react'
import Grid from '@material-ui/core/Grid';
import Item from './Item.component'


function ItemsList(props) {
    // onSearchInputChange = (event) => {
    //     console.log("Search changed ..." + event.target.value)
    //     if (event.target.value) {
    //         this.setState({searchString: event.target.value})
    //     } else {
    //         this.setState({searchString: ''})
    //     }
    //     this.getCourses()
    // }
    
    return (
        <div>
            { props.items ? (
                <div>
                    <Grid container spacing={24} style={{padding: 24}}>
                        { props.items.map(item => (
                            <Grid key={item._id} item xs={12} sm={6} lg={4} xl={3} style={{padding:10}}>
                                <Item key={item._id} info={item} />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            ) : "No items found" }
        </div>
    )
}

export default ItemsList;