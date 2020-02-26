import React, { Component } from 'react';
import {List, ListItem, ListItemContent, ListItemAction, Icon} from 'react-mdl';
import {Card, CardActions, CardMenu, CardText, CardTitle, Button, IconButton} from 'react-mdl';

class Profile extends Component {
    render() {
        return(
            
            <div style={{margin:'2%'}}>
            <Card shadow={0} style={{width: '512px', margin: 'auto'}}>
                <CardTitle style={{color: '#fff', height: '176px', background: 'url(http://www.getmdl.io/assets/demos/welcome_card.jpg) center / cover'}}>My Profile</CardTitle>
                <CardText>
                    <List style={{width: '300px'}}>
              <ListItem>
                <ListItemContent avatar="person">User Name</ListItemContent>
              </ListItem>
          
            </List>
                        </CardText>
                <div style={{margin: '5%'}}>
                        <CardText>
                            User Info 1
                        </CardText>
                        <CardText>
                            User Info 2
                        </CardText>
                        <CardText>
                            User Info 3
                        </CardText>
                        <CardText>
                            User Info 4
                        </CardText>
                        <CardText>
                            User Info 5
                        </CardText>
                    </div>
                <CardMenu style={{color: '#fff'}}>
                    <IconButton name="share" />
                </CardMenu>
            </Card>
             </div>
            
            
            
       
        )
    }
    
}
export default Profile;