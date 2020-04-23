const axios = require('axios')

// export const fetchLocationId = city => {
//     axios
//     .get(`https://www.metaweather.com/api/location/search/?query=${city}/`)
//     .then(response => response.woeid)
//     .catch(error => console.log(error))
// }

export const fetchLocationId = async city => {
    try {
      const response = await axios.get(`https://www.metaweather.com/api/location/search/?query=${city}`)
      const { woeid }  = response.data[0]
        return woeid
    } catch (error) {
      console.error(error)
    }
  }

  

export const fetchWeather = async locationId => {
    try {
         const response = await axios.get(`https://www.metaweather.com/api/location/${locationId}`)
         const { weather_state_name, the_temp } = response.data.consolidated_weather[0]
         const { title } = response.data.parent
         return ({
           weather : weather_state_name,
           temperature: Math.trunc(the_temp),
           location: title
         })
    } catch (error) {
        console.error();
        
    }
   
}

// getUsers() {
//     axios
//       .get("https://randomuser.me/api/?results=5")
//       .then(response => console.log(response))
//       .catch(error => this.setState({ error, isLoading: false }));
//   }