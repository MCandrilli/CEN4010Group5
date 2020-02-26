import React, { Component } from 'react';
import {List, ListItem, ListItemContent, ListItemAction, Icon} from 'react-mdl';
import {Card, CardActions, CardMenu, CardText, CardTitle, Button, IconButton} from 'react-mdl';

class About extends Component {
    render() {
        return(
            
            <div style={{margin:'2%'}}>
            <Card shadow={0} style={{width: '512px', margin: 'auto'}}>
                <CardTitle style={{color: '#fff', height: '176px', background: 'url(http://www.getmdl.io/assets/demos/welcome_card.jpg) center / cover'}}>About Us</CardTitle>
                <CardText>
                    <List style={{width: '300px'}}>
              <ListItem>
                <ListItemContent avatar="person">Michael C</ListItemContent>
                <ListItemAction>
                  <a href="#"><Icon name="star" /></a>
                </ListItemAction>
              </ListItem>
              <ListItem>
                <ListItemContent avatar="person">Emmanuel C</ListItemContent>
                <ListItemAction>
                  <a href="#"><Icon name="star" /></a>
                </ListItemAction>
              </ListItem>
              <ListItem>
                <ListItemContent avatar="person">Anthony C</ListItemContent>
                <ListItemAction>
                  <a href="#"><Icon name="star" /></a>
                </ListItemAction>
              </ListItem>
            <ListItem>
                <ListItemContent avatar="person">Caitlin C</ListItemContent>
                <ListItemAction>
                  <a href="#"><Icon name="star" /></a>
                </ListItemAction>
              </ListItem>
            <ListItem>
                <ListItemContent avatar="person">Tommy C</ListItemContent>
                <ListItemAction>
                  <a href="#"><Icon name="star" /></a>
                </ListItemAction>
              </ListItem>
            <ListItem>
                <ListItemContent avatar="person">Adriel C</ListItemContent>
                <ListItemAction>
                  <a href="#"><Icon name="star" /></a>
                </ListItemAction>
              </ListItem>
            </List>
                </CardText>
                
                <CardMenu style={{color: '#fff'}}>
                    <IconButton name="share" />
                </CardMenu>
            </Card>
             </div>
            
            
            
       
        )
    }
    
}

export default About;