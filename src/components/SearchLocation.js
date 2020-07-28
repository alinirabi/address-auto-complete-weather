import React, { useState, useEffect, useRef } from "react";
import {makeStyles} from '@material-ui/core/styles'
import Constants from '../common/Constants';
import WeatherBox from '../components/WeatherBox'
let autoComplete;
let addressObject

const useStyles=makeStyles({
  container:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:130
  },
  searchInput:{
    height: 32,
    width: '100%',
    padding: '8px 12px',
    border: 'none',
    fontSize: 16,
    borderRadius: 24
  },
  searchLocation:{
    display: 'flex',
    width: 484,
    borderRadius: 24,
    border: '1px solid #d8d8d8'
  }
})

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function() {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};
function SearchLocationInput() {
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);

  function handleScriptLoad(updateQuery, autoCompleteRef) {
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current,
    );
    autoComplete.setFields(["address_components", "formatted_address"]);
    autoComplete.addListener("place_changed", () =>
      handlePlaceSelect(updateQuery)
    );
  }
  
  async function handlePlaceSelect(updateQuery) {
   addressObject = autoComplete.getPlace();
    const query = addressObject.formatted_address;
    updateQuery(query);
    const address=addressObject.formatted_address;
    let nameArr = address.split(',');
    
    let CityTemp = nameArr[nameArr.length-3]===undefined ? String(nameArr[nameArr.length-2]) : String(nameArr[nameArr.length-3]);
    const City =(CityTemp.replace(/\d+/g,''));
    const Country = nameArr[nameArr.length-1];
   
    setCity(City)
    setCountry(Country)
  }
  const [query, setQuery] = useState("");
  
  const autoCompleteRef = useRef(null);
  console.log(autoCompleteRef)

  useEffect(() => {
   
    loadScript(
      `${Constants.API}?key=${Constants.KEY}`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
  }, []);
  const classes = useStyles();
  return (
    <div>
    <div className={classes.container}>
      <div className={classes.searchLocation}>
        <input
          ref={autoCompleteRef}
          onChange={event => setQuery(event.target.value)}
          placeholder="Enter the address"
          value={query}
          className={classes.searchInput}
        />
       
      </div>
     </div>
     {/* {city!=undefined && country!=''? */}
     <WeatherBox 
     Country={city}
     City={country}
     />
      {/* : null}  */}
    </div>
  );
}

export default SearchLocationInput;
