import React, {Fragment} from 'react';
import axios from 'axios';
import './ui.body.css';
import Weather from './weather/weather';
import LocationSearchInput from "./search/ui.search"
import LocationProfile from "./locationProfile/ui.LocationProfile"

class AppBody extends React.Component{
    constructor(){
        super();

        this.state ={
            searchText: "Manchester"
        };
     
        this.onSearchChanged = this.onSearchChanged.bind(this);
       
        
    }

    onSearchChanged(searchText){
        this.setState({searchText: searchText})
    }
 
  

    render(){
        return(
            <div className="body">
               <div className="container-fluid" style={this.containerStyle}>
                   <LocationSearchInput searchText={this.state.searchText} searchChangeSearch={this.onSearchChanged} />
                   <LocationProfile locationName={this.state.searchText} />
                </div>
            </div>
        );
    }

}
export default AppBody;