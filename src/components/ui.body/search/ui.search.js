import React, {Component,Fragment} from 'react';
import axios from 'axios';
import { InputGroup, InputGroupAddon,   Button } from 'reactstrap';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'bootstrap/dist/css/bootstrap.css';
import './ui.search.css'

class LocationSearchInput extends Component{

    constructor(props){
        super(props);
        this.state = {
            searchText: '',
            options: []
        }

    }

    updateInputValue = (query) =>{

        axios.get('http://web.flickrsystem.api/api/v1/place/' + query)
        .then(response => { 
            this.setState({options: response.data});
         });
    }

    _querySelected = (query) => {
          if(query!== this.state.searchText){
                this.setState({searchText: query});
          }
    }
    

     _locationSearch = (event) =>{
         this.props.onItemSelected(this.state.searchText);
    }

    Search(data){
        this.props.triggerSearch(data);
    }

   render(){
       return (
        <Fragment>
            <InputGroup>
                <AsyncTypeahead id ="test" className="asyncTypeahead"
                        bsSize="large"
                        minLength={2}
                        onSearch={this.updateInputValue}
                        options={this.state.options}
                        placeholder="Search for a Snappy Location."
                        onInputChange={this._querySelected}
                        isLoading = {false}
                    />
                <InputGroupAddon addonType="append">
                 <Button color="success"  onClick={() => this.Search(this.state.searchText)}>Search</Button>
                </InputGroupAddon>
            
            </InputGroup>
        </Fragment>
       )
   }
}

export default  LocationSearchInput 