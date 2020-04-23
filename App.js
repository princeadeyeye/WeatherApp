import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, KeyboardAvoidingView, ImageBackground, ActivityIndicator, StatusBar } from 'react-native';
import SearchInput from './components/SearchInput'
import { fetchLocationId, fetchWeather } from './utilis/api';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      weather: '',
      temperature: '',
      loading: false,
      error: false
    }
  }
handleUpdateLocation = async city => {
  if (!city) return
  this.setState({ loading: true}, async () => {
    try {
      const locationId = await fetchLocationId(city)
      const { location, weather, temperature } = await fetchWeather(locationId)
      this.setState({
        loading: false,
        error: false,
        location,
        weather,
        temperature
      })
    }
    catch (err) {
      this.setState({
        loading: false,
        error: true
      })
    }
  })
}

  render() {
    const { loading, error, location, weather, temperature } = this.state
    const { container, textStyle, largeText, smallText, imageContainer, image } = styles
    return (
      <KeyboardAvoidingView style={container} behaviour='padding'>
        <StatusBar barStyle="light-content" />
      {
        /*
        
         */
      }  
      <ImageBackground
          source={ require('./assets/splash.png')}
          style={imageContainer}
          imageStyle={image}
        >
       <View>
       <ActivityIndicator animating={loading} color="dark" size="large" />

       {
         !loading && (
           <View>
            {
              error && (
                <Text style={[smallText, textStyle]}>
                  Could not load weather, Please try a different city
                </Text>
              )
            }
            {
              !loading && (
                <View>
                <Text style={[textStyle, largeText] }>{location}</Text>
                <Text style={[textStyle, smallText]}>{weather}</Text>
                <Text style={[textStyle, largeText]}>{`${temperature}°`}</Text>
                </View>
              )
            }
           </View>
         )
       }
      <SearchInput 
        placeholder='Search any city' 
        onSubmit={this.handleUpdateLocation}
      />
       </View>
        
      </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18
  }, 
  imageContainer: {
  },
  image: {
    flex: 1,
    width:null,
    height: null,
    resizeMode: 'cover'
  }
});
