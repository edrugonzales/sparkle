

export const reverseGeocode = async (long, lat) => {
    let response =  await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.REACT_APP_GOOGLE_KEY}`,{
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      })

    let jsonData = await response.json()

    return jsonData;
}


export const placesAutoComplete = async (input) => {
    let response =  await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&Location&key=${process.env.REACT_APP_GOOGLE_KEY}`,{
        method: "GET",
        headers: {
          crossDomain: true,
          Accept: "application/json",
        },
      })

    let jsonData = await response.json()

    return jsonData;
}


export const getDistance = async (startLng, startLat, endLng, endLat) => {


  // try {
  //   let response =  await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${startLat},${startLng}&destinations=${endLat}%2C${endLng}&key=${process.env.REACT_APP_GOOGLE_KEY}`,{
  //   method: "GET",
  //   headers: {
  //     Accept: "application/json",
  //   },
  // })

  //   let jsonData = await response.json()

  //   

  //   return jsonData;

  // } catch (error) {
  //   
    
  // }



// const service = google.maps.DistanceMatrixService();




// const request = {
//   origins: [startLat, startLng],
//   destinations: [endLat, endLng],
//   travelMode: google.maps.TravelMode.DRIVING,
//   unitSystem: google.maps.UnitSystem.METRIC,
//   avoidHighways: false,
//   avoidTolls: false,
// };


// service.getDistanceMatrix(request).then((response) => {
//   
// })

}


