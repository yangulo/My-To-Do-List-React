import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import CreateIcon from '@material-ui/icons/Create'
import DeleteIcon from '@material-ui/icons/Delete'
import ListOfDoneItems from './listDoneItems'
import AddItem from './addItem'
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import SearchBar from './searchBar'
import escapeRegExp from 'escape-string-regexp'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'


class ListOfItems extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            listItems: ["Buy milk","Do loundry","Clean house","Fold clothes"],
            itemUpdated: "",
            newItem: "",
            addItem: "",
            doneItems: [],
            filterList: [],
            dialogFlagClosed: false, 
            open: true,
            searchFlag: false,
            addItemFlag: false
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleDialogOpen = this.handleDialogOpen.bind(this)
        this.itemToBeUpdated = this.itemToBeUpdated.bind(this)
        this.handleDoneDelete = this.handleDoneDelete.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleAddItemAndClose = this.handleAddItemAndClose.bind(this)
    }

    handleClick(value){
        const newDoneList = [...this.state.doneItems] // Spread Syntax
        const newList = [...this.state.listItems]
        this.setState({
            listItems: newList.filter( item => {
                return item !== value
            }), 
            doneItems: [...newDoneList, value]
        })
    }

    handleDialogOpen(value){
        this.setState({
            dialogFlagClosed: true,
            itemUpdated: value
        })
    }

    itemToBeUpdated(value){
        this.setState({
            newItem: value,
        })
    }

    handleSaveAndClose(){
        let newlistItems = this.state.listItems.filter(i => {
            return i !== this.state.itemUpdated
        })
        this.setState({
            itemUpdated: "",
            listItems: [...newlistItems, this.state.newItem],
            dialogFlagClosed: false
        })
    }

    handleCancelClose(){
        this.setState({
            dialogFlagClosed: false,
            addItemFlag: false
        })
    }

    handleDelete(value){
        const newList = [...this.state.listItems]
        this.setState({
            listItems: newList.filter(i => {
                return i !== value
            })
        })
    }

    handleDoneDelete(value) {
        const newDoneList = [...this.state.doneItems]
        this.setState({
            doneItems: newDoneList.filter(i => {
                return i !== value
            })
        })
    }

    handleSearch(value){
        if(value.length>0){
            this.setState({
                searchFlag: true
            })
            const val = value.toUpperCase()
            const li = this.state.listItems
            if (val) {
                // RegExp creates a regular expression object for matching text with a pattern
                const match = new RegExp(escapeRegExp(val), 'i')
                this.setState({
                    filterList: li.filter( item => match.test(item))
                })
            }
        } else {
            this.setState({
                searchFlag: false
            })
        }
    }

    openDialogAddItem(){
        this.setState({
            addItemFlag: true
        })
    }

    itemToBeAdded(value){
        this.setState({
            addItem: value
        })
    }

    handleAddItemAndClose(){
        this.setState({
            listItems: [...this.state.listItems, this.state.addItem],
            addItemFlag: false
        })

    }
  
    render() {
        let li
        let oldItem = this.state.itemUpdated
    if(this.state.searchFlag) {
        li = this.state.filterList
    } else {
        li = this.state.listItems
    }

    return (
        <div>
        <SearchBar f={this.handleSearch}/>
        <List id="myLI">
            {li.sort().map(value => 
                <ListItem key={value}>
                    <ListItemIcon>
                        <Checkbox onClick={(e) => this.handleClick(value)}/>
                    </ListItemIcon>
                    <ListItemText primary={value}/>
                    <ListItemIcon>
                        <IconButton onClick={(e) => this.handleDialogOpen(value)}>
                            <CreateIcon/>
                        </IconButton>
                    </ListItemIcon>
                    <ListItemIcon>
                        <IconButton onClick={(e) => this.handleDelete(value)}>
                            <DeleteIcon/>
                        </IconButton>
                    </ListItemIcon>
                </ListItem>)}
        </List>
        <ListOfDoneItems p={this.state.doneItems} f={this.handleDoneDelete}/>
        <Fab color="secondary" aria-label="edit">
            <AddIcon onClick={(e) => this.openDialogAddItem()}/>
        </Fab>
        {this.state.dialogFlagClosed ? 
            <Dialog open={this.state.dialogFlagClosed}>
                <DialogTitle>Update Item</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <TextField multiline rowsMax="4" label="New item" placeholder={oldItem} onChange={(event) => 
                        this.itemToBeUpdated(event.target.value)}/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={(e) => this.handleCancelClose()}>Cancel</Button>
                    <Button onClick={(e) => this.handleSaveAndClose()}>Save</Button>
                </DialogActions>
            </Dialog> : ""}
        <AddItem/>
        {this.state.addItemFlag ? 
            <Dialog open={this.state.addItemFlag}>
            <DialogTitle>Add Item</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <TextField multiline rowsMax="4" label="Add item" placeholder="Add item" onChange={(event) => 
                    this.itemToBeAdded(event.target.value)}/>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={(e) => this.handleCancelClose()}>Cancel</Button>
                <Button onClick={(e) => this.handleAddItemAndClose()}>Save</Button>
            </DialogActions>
        </Dialog> : ""}
        </div>
    )}
}
export default ListOfItems
