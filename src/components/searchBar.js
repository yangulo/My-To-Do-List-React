import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'

class SearchBar extends React.Component{
    
    render(){
        return(
            <div>
                <FormControl onChange={(event) => this.props.f(event.target.value)}>
                    <InputLabel>Filter Items</InputLabel>
                    <Input startAdornment={
                        <InputAdornment >
                            <SearchIcon />
                        </InputAdornment>}/>
                </FormControl>
            </div>
        )
    }
}

export default SearchBar