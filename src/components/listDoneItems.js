import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'

export default function ListOfDoneItems(props) {
    const doneItems = props.p
    const isEmpty = doneItems.length <= 0 ? true : false

        return(
            <div>
                {isEmpty ? "" : <h2 style={{color: "red"}}>Done Items</h2>}
                <List>
                    {doneItems.map(i => 
                    <ListItem key={i}>
                        <ListItemText style={{color: "red"}} primary={i}/>
                        <ListItemIcon>
                            <IconButton>
                                <DeleteIcon onClick={(e) => props.f(i)}/>
                            </IconButton>
                        </ListItemIcon>
                    </ListItem>
                    )}
                </List> 
            </div>
        )
}
