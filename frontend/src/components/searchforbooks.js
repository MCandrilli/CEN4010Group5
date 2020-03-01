import React, { Component } from 'react';
import {Textfield} from 'react-mdl';
import { Card, CardTitle, CardText, CardActions, Button, Grid, Cell} from 'react-mdl';

class Searchforbooks extends Component {
    render() {
         return(
           <div style={{width: '90%', margin: '2%', border: '1px solid #888', borderRadius: '15px'}}>
                        <Textfield
                onChange={() => {}}
                label="Enter Title of Book to Search..."
                style={{margin: '20px',width: '95%', justifyContent:'center', alignItems:'center'}}
                />
            

            <Grid className="demo-grid-1">
                     <Cell col={4}><Card shadow={0} style={{ width: '320px', height: '620px', margin: 'auto'}}>
                        <CardTitle expand style={{ color: '#fff', background: 'url(https://firstfreerockford.org/wp-content/uploads/2018/08/placeholder-book-cover-default.png) bottom right 15% no-repeat rgb(207,217,226)'}}>Result 1</CardTitle>
                        <CardText>
                            <p><strong> Author: </strong></p>
                            <p> Language:  </p>
                            <p> Pages:  </p>
                            <p> Year:  </p>
                        </CardText>
                        <CardActions border>
                            <Button colored>View Book</Button>
                        </CardActions>
                    </Card></Cell>
                        
                        <Cell col={4}><Card shadow={0} style={{ width: '320px', height: '620px', margin: 'auto'}}>
                        <CardTitle expand style={{ color: '#fff', background: 'url(https://firstfreerockford.org/wp-content/uploads/2018/08/placeholder-book-cover-default.png) bottom right 15% no-repeat rgb(207,217,226)'}}>Result 2</CardTitle>
                        <CardText>
                            <p><strong> Author: </strong></p>
                            <p> Language:  </p>
                            <p> Pages:  </p>
                            <p> Year:  </p>
                        </CardText>
                        <CardActions border>
                            <Button colored>View Book</Button>
                        </CardActions>
                    </Card></Cell>
                        
                        <Cell col={4}><Card shadow={0} style={{ width: '320px', height: '620px', margin: 'auto'}}>
                        <CardTitle expand style={{ color: '#fff', background: 'url(https://firstfreerockford.org/wp-content/uploads/2018/08/placeholder-book-cover-default.png) bottom right 15% no-repeat rgb(207,217,226)'}}>Result 3</CardTitle>
                        <CardText>
                            <p><strong> Author: </strong></p>
                            <p> Language:  </p>
                            <p> Pages:  </p>
                            <p> Year:  </p>
                        </CardText>
                        <CardActions border>
                            <Button colored>View Book</Button>
                        </CardActions>
                    </Card></Cell>
                
                </Grid>

            </div>
        )
    }
    
}

export default Searchforbooks;