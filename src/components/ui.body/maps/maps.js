import React, {Component} from 'react';
import {withGoogleMap, GoogleMap, Marker} from 'react-google-maps';

class Map extends Component{

    renderMarkers(){
        return(this.props.markers.map((marker, index) =>(
            <Marker position={marker} key={index} />)))
    }

    render(){

        return(
  
           <GoogleMap
                defaultZoom ={3}
                defaultCenter ={this.props.defaultcenter}
                center = {this.props.center}>
                {this.renderMarkers()}
            </GoogleMap>

        )
    }
}

export default withGoogleMap( Map )

            