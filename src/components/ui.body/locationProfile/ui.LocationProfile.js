import React, {Component,Fragment} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Gallery from 'react-grid-gallery';
import  Map from '../maps/maps';
import Weather from '../weather/weather';


class LocationProfile extends Component{

    constructor(props){
        super(props);

        this.state ={
            locationName:this.props.locationName,
            images:[],
            markers:[],
            weather:'',
            center:''
        }

      
    }

    
   render(){
          
       return (
            <Fragment>
            <p>location profile name: {this.props.locationName}</p>
            <div className="row">
                <div className={["col-md-10", "spacer-10"].join(' ')} style={{height:400+'px'}}>
                    <Map 
                        zoom={16}
                        markers = {this.state.markers}
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCv1TJmGi-CLd18lqfY30-qM-B37KnJ7v0"
                        center={this.state.center}
                        defaultCenter={{lat:40.728,lng: -73.089}}
                        containerElement={<div style={{height:100+'%'}}/>}
                        mapElement={<div style={{height:100+'%'}}/>} />
                </div>
                <div className={["col-md-2", "spacer-10"].join(' ')} style={{height:400+'px'}}>
                    <Weather weatherData = {this.state.weather} />
                </div>
            </div>
            <div className="row">
                <div className={["col-md-10", "spacer-10"].join(' ')} style={{height:400+'px'}}>
                    <Gallery images={this.state.images}/> 
                </div>
            </div>
            
            </Fragment>
        
       )
   }
   componentWillReceiveProps(nextProps){
       console.log("searching-props:" + this.props.locationName);
       console.log("searching-nextProps:" + nextProps.locationName);
    if (nextProps.locationName !== this.props.locationName) {
        console.log("searching-state:" + this.state.locationName);
        this.setState({locationName: nextProps.locationName},
        function(){
            console.log("searching-state:" + this.state.locationName);
            this.fetchLocation();
        });
        
    }
   }
 

   
   componentDidMount(){
       this.fetchLocation();
   }

   fetchLocation(){
       console.log("fetching: " + this.state.locationName)
        axios.get('https://www.snappy-places.com/api/v1/image/' + this.state.locationName)
        .then(
            (res) => {
                this.setState({images: res.data.gallery}); 
                console.log("images: " + res.data.gallery);
                this.setState({markers:res.data.mapMarkers});
                console.log("markers: " + this.state.mapMarkers);
                this.setState({weather:res.data.weather.weatherViewModel});
                
                this.setState({center:res.data.mapMarkers[0]})
                console.log("center: " + this.state.center);
            }
        );
   }
}

export default  LocationProfile 