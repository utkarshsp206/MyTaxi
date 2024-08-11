import React, { useContext, useEffect, useState } from 'react'
import { DirectionsRenderer, GoogleMap, MarkerF, OverlayView, OverlayViewF, useJsApiLoader } from '@react-google-maps/api';
import { SourceContext } from '../../context/SourceContext';
import { DestinationContext } from '../../context/DestinationContext';



function GoogleMapSection() {
  const containerStyle = {
    width: '100%',
    height: window.innerWidth*0.45
  };
  
  const {source,setSource}=useContext(SourceContext);
  const {destination,setDestination}=useContext(DestinationContext);

  const [center,setCenter]=useState({
    lat: 28.6139,
    lng: 77.2090
  });


  const [map, setMap] = React.useState(null)
  const [directionRoutePoints,setDirectionRoutePoints]=useState([]);

  useEffect(()=>{
    if(source?.length!=[]&&map)
    {
      map.panTo(
        {
          lat:source.lat,
          lng:source.lng
        }
      )
        setCenter({
          lat:source.lat,
          lng:source.lng
        });
    }
    if(source.length!=[]&&destination.length!=[])
      {
        console.log('DIE')
        directionRoute();
      }
    },[source])

    /**
   * Used when Destination Value Available
   */
  useEffect(()=>{
    if(destination?.length!=[]&&map)
    {
        setCenter({
          lat:destination.lat,
          lng:destination.lng
        })
    }

    if(source.length!=[]&&destination.length!=[])
    {
      console.log('DIE')
      directionRoute();
    }
  },[destination])

   /**
   * Used to Get Direction Router Points 
   */
   const directionRoute=()=>{
    const DirectionsService=new google.maps.DirectionsService();
    console.log('DIE')
    DirectionsService.route({
      origin:{lat:source.lat,lng:source.lng},
      destination:{lat:destination.lat,lng:destination.lng},
      travelMode:google.maps.TravelMode.DRIVING
    },(result,status)=>{
        if(status===google.maps.DirectionsStatus.OK)
        {
        
            setDirectionRoutePoints(result)
        }
        else{
          console.error('Error');
        }
    })
  }

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return  (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{mapId:'357b87827b5cd5d9'}}
      >
          {source.lenght!=[]?  <MarkerF 
        position={{lat:source.lat,lng:source.lng}}
        icon={{
          url:"/source.svg",
          scaledSize:{
            width:20,
            height:20
          }
        }}>    <OverlayViewF
        position={{lat:source.lat,lng:source.lng}}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div className='p-2 bg-white font-bold inline-block'>
            <p className='text-black text-[18px]'>{source.label}</p>
          </div>
        </OverlayViewF>

      </MarkerF>:null}

      {destination.lenght!=[]?  <MarkerF 
        position={{lat:destination.lat,lng:destination.lng}}
        icon={{
          url:"/source.svg",
          scaledSize:{
            width:20,
            height:20
          }
        }}
        >
           <OverlayViewF
          position={{lat:destination.lat,lng:destination.lng}}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className='p-2 bg-white font-bold inline-block'>
              <p className='text-black text-[18px]'>{destination.label}</p>
            </div>
          </OverlayViewF>
        </MarkerF>:null}
       
        <DirectionsRenderer
          directions={directionRoutePoints}
          options={{
            polylineOptions:{
              strokeColor:'#000',
              strokeWeight:5
            },
            suppressMarkers:true
          }}
        />
       
    
      </GoogleMap>
  ) 
}

export default GoogleMapSection