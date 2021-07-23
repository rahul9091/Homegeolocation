import React, { Component } from 'react'

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default class MapScreen extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const {obj} = this.props.route.params;
        console.log(obj,'obj in next screen')
        const latitude = obj.latitude;
        const longitude = obj.longitude;
        
        return (
           <MapView style={{flex:1}}
           provider={PROVIDER_GOOGLE}
           showsUserLocation
           initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
           }}
           />
        )
    }
}
