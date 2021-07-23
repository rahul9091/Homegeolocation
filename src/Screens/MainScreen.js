import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,Button, Image,Alert } from 'react-native';
import * as Location from 'expo-location';

const App = (props) => {
  const [locationServiceEnabled,setLocationServiceEnabled] = useState(false)
  const[displayCurrentAddress,setDisplayCurrentAddress] = useState(
    'Wait, we are fetching your location'
  )

const ifLocationEnabled = async () => {
  const enabled = await Location.hasServicesEnabledAsync();
  if(!enabled){
    Alert.alert('Location Service not enabled','Please Enable location service to continue',[{
      text:'Ok'
    }])
  }else{
    console.log('enabled')
    setLocationServiceEnabled(enabled)
  }
}

const getCurrentLocation = async () => {
  const permission = await Location.requestForegroundPermissionsAsync()
  if(!permission){
    Alert.alert("Permission Denied","Pleasse allow location to Work",[{
      text:'ok'
    }])
  }else{
    const {coords} = await Location.getCurrentPositionAsync()
    console.log(coords,'got the coords')
    if (coords) {
      const {latitude,longitude} = coords
      let location = await Location.reverseGeocodeAsync({
        latitude,longitude
      })
      console.log(location,'location got ')
      for(let item of location){
        const address =`${item.street} ${item.district} ${item.subregion} ${item.postalCode} ${item.region}`
        setDisplayCurrentAddress(address)
        if(address.length > 0){
            setTimeout(()=>{
                props.navigation.navigate('Map',{obj:coords})
            },2000)
        }
      }
      
    }
  }
}
// if(coords.length > 0){
//     setTimeout(()=>{
//         props.navigation.navigate('Map')
//     },2000)
// }




useEffect(()=>{
  ifLocationEnabled()
},[])

useEffect(()=>{
  getCurrentLocation()
},[])







  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image source={{uri:'https://thumbs.dreamstime.com/b/red-maps-pin-location-map-icon-location-pin-pin-icon-vector-red-maps-pin-location-map-icon-location-pin-pin-icon-vector-vector-140200096.jpg'}} style={styles.image} />
        <Text style={styles.title}>What's your address?</Text>
      </View>
      <Text style={styles.text}>{displayCurrentAddress}</Text>
      <Button title="Map" onPress={()=>props.navigation.navigate('Map')}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070707',
    alignItems: 'center',
    paddingTop: 130
  },
  contentContainer: {
    alignItems: 'center',
    marginBottom: 20
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FD0139'
  },
  text: {
    fontSize: 20,
    fontWeight: '400',
    color: '#fff'
  }
});

export default App;