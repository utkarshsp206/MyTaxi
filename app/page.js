"use client";

import GoogleMapSection from './../components/Home/GoogleMapSection';
import SearchSection from './../components/Home/SearchSection';
import { DestinationContext } from './../context/DestinationContext';
import { SourceContext } from './../context/SourceContext';
import { UserButton } from '@clerk/nextjs';
import { useJsApiLoader } from '@react-google-maps/api';
import Image from 'next/image';
import { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import Head from 'next/head';

export default function Home() {
  const [source, setSource] = useState([]);
  const [destination, setDestination] = useState([]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    libraries: ['places'],
  });

  if (!isLoaded) {
    return <div>Loading...</div>; // Show loading message until the API is loaded
  }

  return (
    <>
      <Head>
        <title>MY TAXI APP</title>
        <meta name="description" content="Get Your bookings at your convenience." />
      </Head>
      <SourceContext.Provider value={{ source, setSource }}>
        <DestinationContext.Provider value={{ destination, setDestination }}>
          <div className='p-6 grid grid-cols-1 md:grid-cols-3 gap-5' style={{'paddingTop':'150px'}}>
            <div>
              <SearchSection />
            </div>
            {/* Hide the map on small devices and only show on large screens */}
            <div className='hidden lg:block col-span-2'>
              <GoogleMapSection />
            </div>
          </div>
        </DestinationContext.Provider>
      </SourceContext.Provider>
    </>
  );
}
