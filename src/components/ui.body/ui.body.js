import React, {Fragment} from 'react';
import axios from 'axios';
import './ui.body.css';
import Gallery from 'react-grid-gallery';
import  Map from './maps/maps';
import Weather from './weather/weather';

import LocationSearchInput from "./search/ui.search"

class AppBody extends React.Component{
    constructor(){
        super();
        this.state = {
            images:[],
            markers:[],
            weather:'',
            tags:'',
            searchText: 'Manchester',
            center:{lat:53.201, lng:2.0562},
            zoom: 11,
            hasSearched: false,
            hasFailedSearch: false,
            key:'AIzaSyCv1TJmGi-CLd18lqfY30-qM-B37KnJ7v0'
        }
        this.divMapStyle ={
            color: 'white',
            border: '1px solid black',
            height: '600px',
            padding: '0px',
            margin: '10px 0px 0px 0px'
        }

        this.containerStyle={
            paddingLeft:  '50px',
            paddingRight:  '50px'
        }
        this.handleClick = this.handleClick.bind(this);
    }
    setSearchState (searchQuery) {
        this.setState({searchText: searchQuery})
        this.handleClick(searchQuery);
    }
   
    handleClick(searchQuery){
        axios.get('http://web.flickrsystem.api/api/v1/image/' + searchQuery)
        .then(
            (response) => {
                console.log(response.data.gallery);
                this.setState({images: response.data.gallery});
                this.setState({markers:response.data.mapMarkers});
                this.setState({weather:response.data.weather.weatherViewModel});
                this.setState({center:response.data.mapMarkers[0]});
                this.setState({hasSearched: true});
                this.setState({hasFailedSearch: false})},
            (error) => { 
                console.log("error occured.");
                this.setState({hasSearched: true});
                this.setState({hasFailedSearch: true});
            }
        )
      

    }

    updateInputValue(evt) {
        this.setState({
            searchText: evt.target.value
        });
      }

    updateTags(evt) {
        this.setState({
            tags: evt.target.value
        });
    }

     showImages(){
            return (<Gallery images={this.state.images}/>  )
    }
    showWeather(){
            return (<Weather weatherData = {this.state.weather}/>)
    }

    showOnFirstLoad(){
        return ( 
            <Fragment>
                <div className={["col-md-4", "spacer-10","box"].join(' ')} >
                    <p className="notFoundTextFound">Hi. Please use the search text box above to start.</p>
                </div>
                <div className={["col-md-8", "spacer-10","box"].join(' ')}>
                    <LocationSearchInput triggerSearch={this.setSearchState.bind(this)} />
                </div>
            </Fragment>
        )
    }

    showOnFailedSearch(){
        return (
            <Fragment>
              <div className={["col-md-4", "spacer-10","box"].join(' ')} >
                  <p className="notFoundTextFound">Sorry we could not find anything useful at the provided location.</p>
              </div>
              <div className={["col-md-8", "spacer-10","box"].join(' ')}>
                  <LocationSearchInput triggerSearch={this.setSearchState.bind(this)} />
              </div>
          </Fragment>
      )
    }

    showOnSuccessfullSearch(){
        return(
            <Fragment>
                <div className="row">
                     <LocationSearchInput triggerSearch={this.setSearchState.bind(this)} />
                </div>
                <div className="row">
                    <div className={["col-md-12", "spacer-10"].join(' ')}>Here are some Snappy Locations for <strong> {this.state.searchText} </strong></div>
                </div>
                <div className="row">
                    <div className={["col-md-12", "spacer-10"].join(' ')}>
                       add story | add image
                    </div>
                </div>
                <div className="row">
                   <div className={["col-md-10", "spacer-10"].join(' ')} style={{height:400+'px'}}>
                        <Map 
                            zoom={12}
                            markers = {this.state.markers}
                            center={this.state.center}
                            defaultCenter={{lat:40.728,lng: -73.089}}
                            containerElement={<div style={{height:100+'%'}}/>}
                            mapElement={<div style={{height:100+'%'}}/>} />
                    </div>
                    <div className={["col-md-2", "spacer-10"].join(' ')}>
                        {this.showWeather()}
                    </div>
                 
                </div>  
                <div className="row">   
                    <div className={["col-md-10", "spacer-10"].join(' ')}>
                       { this.showImages()}
                    </div>
                    
                </div>
            </Fragment>)
    }

    showResults(){
      
    
            if( !this.state.hasSearched){
               return(this.showOnFirstLoad())
            }
            else if( this.state.hasFailedSearch){
                return(this.showOnFailedSearch())
            }
            else{
                return(this.showOnSuccessfullSearch())
            }
    }
      

    render(){
        return(
            <div className="body">
               <div className="container-fluid" style={this.containerStyle}>
                    <div className="row"> 
                        <div className="col-md-10">
                        {this.showResults()}
                       </div>
                    </div>
                </div>
                
           
            </div>
        );
    }

}
export default AppBody;