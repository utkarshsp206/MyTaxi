"use client"
import { SourceContext } from '../../context/SourceContext';
import { DestinationContext } from '../../context/DestinationContext';
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'

const locations = [
    { label: 'New Delhi', lat: 28.6139, lng: 77.2090 },
    { label: 'Mumbai', lat: 19.0760, lng: 72.8777 },
    { label: 'Bangalore', lat: 12.9716, lng: 77.5946 },
    { label: 'Chennai', lat: 13.0827, lng: 80.2707 },
    { label: 'Kolkata', lat: 22.5726, lng: 88.3639 },
    { label: 'Lucknow', lat: 26.8467, lng: 80.9462 },
    { label: 'Gorakhpur', lat: 26.7606, lng: 83.3732 }
  ];
  

function InputItem({type}) {
    const [placeholder, setPlaceholder] = useState(null);
    const {source,setSource}=useContext(SourceContext);
    const {destination,setDestination}=useContext(DestinationContext);

    useEffect(() => {
      if (type === 'source') {
          setPlaceholder('Pickup Location');
      } else {
          setPlaceholder('Dropoff Location');
      }
  }, [type]);

  const handleSelectLocation = (e) => {
    const selectedLocation = locations.find(loc => loc.label === e.target.value);
    if (selectedLocation) {
        if (type === 'source') {
            setSource(selectedLocation);
        } else {
            setDestination(selectedLocation);
        }
    }
};

  return (
    <div className='bg-slate-200 p-3 px-3 rounded-lg mt-6 flex items-center gap-4'>
        <Image src='/source.svg' width={15} height={15} alt={`${type} icon`} />
        <select
            onChange={handleSelectLocation}
            className='w-full bg-transparent border-none focus:outline-none'
            placeholder={placeholder}
            defaultValue=""
        >
            <option value="" disabled>Select {placeholder}</option>
            {locations.map(location => (
                <option key={location.label} value={location.label}>
                    {location.label}
                </option>
            ))}
        </select>
    </div>
);

}

export default InputItem