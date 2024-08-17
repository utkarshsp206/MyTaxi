// import { CarListData } from './../../utils/CarListData'
// import React, { useState } from 'react'
// import CarListItem from './CarListItem'
// import { useRouter } from 'next/navigation';

// function CarListOptions({distance}) {
//   const [activeIndex,setActiveIndex]=useState();
//   const [selectedCar,setSelectedCar]=useState([]);
//   const router=useRouter();
//   return (
//     <div className='mt-5 p-5 overflow-auto h-[250px]'>
//         <h2 className='text-[22px] font-bold'>Recommeded</h2>
//         {CarListData.map((item, index)=>(
//             <div key={index} className={`cursor-pointer p-2 px-4 rounded-md
//             border-black
//             ${activeIndex==index?'border-[3px]':null}`
          
//           }
//             onClick={()=>{setActiveIndex(index);
//             setSelectedCar(item)}}
//             >
//                 <CarListItem car={item} distance={distance} />
//             </div>
//         ))}

//       {selectedCar?.name?  <div className='flex justify-between fixed 
//         bottom-5 bg-white p-3 shadow-xl rounded-lg
//         w-full md:w-[30%] border-[1px] items-center'>
//           <h2>Make Payment For</h2>
//           <button className='
//           p-3 bg-black text-white rounded-lg
//           text-center'
//           onClick={() => router.push(`/BookingPage?carName=${selectedCar.name}&distance=${distance}&source=${source}&destination=${destination}`)}

//           >Request {selectedCar.name}</button>
//         </div>:null}
//     </div>
//   )
// }

// export default CarListOptions


import { CarListData } from './../../utils/CarListData';
import React, { useState, useContext } from 'react';
import CarListItem from './CarListItem';
import { useRouter } from 'next/navigation';
import { SourceContext } from '../../context/SourceContext';
import { DestinationContext } from '../../context/DestinationContext';

function CarListOptions({ distance }) {
  const [activeIndex, setActiveIndex] = useState(null);  // Change the default value to null
  const [selectedCar, setSelectedCar] = useState(null);  // Change the default value to null
  const { source } = useContext(SourceContext);
  const { destination } = useContext(DestinationContext);
  const router = useRouter();

  return (
    <div className='mt-5 p-5 overflow-auto h-[250px]'>
      <h2 className='text-[22px] font-bold'>Recommended</h2>
      {CarListData.map((item, index) => (
        <div
          key={index}
          className={`cursor-pointer p-2 px-4 rounded-md border-black ${activeIndex === index ? 'border-[3px]' : ''}`}
          onClick={() => {
            setActiveIndex(index);
            setSelectedCar(item);
          }}
        >
          <CarListItem car={item} distance={distance} />
        </div>
      ))}

      {selectedCar?.name ? (
        <div className='flex justify-between fixed bottom-5 bg-white p-3 shadow-xl rounded-lg w-full md:w-[30%] border-[1px] items-center'>
          <h2>Make Payment For</h2>
          <button
            className='p-3 bg-black text-white rounded-lg text-center'
            onClick={() =>
              router.push(
                `/booking?carName=${selectedCar.name}&distance=${distance}&source=${source.label}&destination=${destination.label}`
              )
            }
          >
            Request {selectedCar.name}
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default CarListOptions;
