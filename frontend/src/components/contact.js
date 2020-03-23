import React, { Component } from 'react';
import {Card, CardMenu, CardText, CardTitle, IconButton} from 'react-mdl';

class Contact extends Component {
    render() {
         return(
             <div style={{margin:'5%'}}>
            <Card shadow={0} style={{width: '512px', margin: 'auto'}}>
                <CardTitle style={{color: '#fff', height: '176px', background: 'url(http://www.getmdl.io/assets/demos/welcome_card.jpg) center / cover'}}>Contact</CardTitle>
                <CardText>
                    Emmanuel C - Ecast@FIU.edu
                </CardText>
                <CardText>
                    Michael C - Ecast@FIU.edu
                </CardText>
                <CardText>
                    Caitlin B - Cb@FIU.edu
                </CardText>
                <CardText>
                    Adriel C - AC@FIU.edu
                </CardText>
                <CardText>
                    Anthony C - AC@FIU.edu
                </CardText>
                <CardText>
                     Tommy C - TC@FIU.edu
                </CardText>
                
                <CardMenu style={{color: '#fff'}}>
                    <IconButton name="share" />
                </CardMenu>
            </Card>
             </div>
        )
    }
    
}

export default Contact;