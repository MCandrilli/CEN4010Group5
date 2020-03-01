import React, { Component } from 'react';
import {Textfield, Button, Switch} from 'react-mdl';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {ListGroupItem,ListGroup, CardTitle, CardText, CardActions, Grid, Cell} from 'react-mdl';
import Typography from '@material-ui/core/Typography';
import Starrating from './starrating';
import { Slider, ButtonBase } from '@material-ui/core';

class BookDetails extends Component {

    getNumbers() {
        let myData = this.props.location.aboutProps || {}
        if (myData.book) {
            return Object.keys(myData.book).map(function(item, index){
                     return item
                });
        } else {
            return false;
        }
    }

    render() {
        let myData = this.props.location.aboutProps || {}                
        if (myData.book) {
            let imageUrl = 'https://raw.githubusercontent.com/benoitvallon/100-best-books/master/static/' + myData.book.imageLink;
            return(
                <div> 
                    {console.log(myData.book)}
                    <Grid>
                        <Cell></Cell>
                        <Cell style = {{width:'320px'}}>
                            <img src={imageUrl}/>
                        </Cell>
                        <Cell>
                            <Typography variant="h4" gutterBottom>
                                <b>{myData.book.title}</b>       
                            </Typography>
                                <p> by: {myData.book.author}</p>
                            <h5>
                                About author


                            </h5>
                            <Button>
                                Option1
                            </Button>
                            <Button>
                                Option2
                            </Button>
                            <Button>
                                Option3
                            </Button>
                            <br />
                            <Button>
                                Add to Shoping Cart
                            </Button>
                        </Cell>
                    </Grid>
                    <div style={{width: '80%', margin: 'auto'}}>
                        <h4>Overview</h4>
                        <span style={{textAlign:'left'}}>
                            Belonging in the immortal company of the great works of literature, Dante Alighieri's poetic masterpiece, The Divine Comedy, is a moving human drama, 
                            an unforgettable visionary journey through the infinite torment of Hell, up the arduous slopes of Purgatory, and on to the glorious realm of Paradise—the 
                            sphere of universal harmony and eternal salvation.
                            <br />
                            Now, for the first time, John Ciardi's brilliant and authoritative translations of Dante's three soaring canticles—The Inferno, The Purgatorio, and The 
                            Paradiso—have been gathered together in a single volume. Crystallizing the power and beauty inherent in the great poet's immortal conception of the aspiring soul, 
                            The Divine Comedy is a dazzling work of sublime truth and mystical intensity.
                        </span>
                    </div>
                    <div style={{width: '80%', margin: 'auto'}}>  
                        <h4 style = {{padding: '100'}}>
                            Coments 
                            <Button>
                                Sort
                            </Button>
                        </h4>
                        <div id = 'NewComment' style={{width: '80%', margin: '0'}}>       
                            <Switch ripple id="Anonymous" defaultChecked>
                                Anonymous comment
                            </Switch>
                            <Textfield
                                label="Book Comments"
                                rows={3}
                                style={{width: '100%'}}
                                maxLength = {'200'}
                            />
                            <div>
                                <Starrating style={{float:'left'}}/>                    
                                <Button border colored style={{float:'left'}}>Submit Comment</Button>
                            </div>
                        </div>        
                    </div>
                </div>   
                )
        }else{
            return( 
                <div></div>
            )
        }
    }
    
}
export default BookDetails;