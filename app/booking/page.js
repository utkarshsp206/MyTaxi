"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { CarListData } from './../../utils/CarListData';  // Adjust the import based on your file structure


function BookingPage() {
    const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCar, setSelectedCar] = useState(null);
  const [distance, setDistance] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [discountedAmount, setDiscountedAmount] = useState(0);
  const [voucherCode, setVoucherCode] = useState('');

  // Form state
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [travellers, setTravellers] = useState(1);
  const [bookEntireCab, setBookEntireCab] = useState(false);

  // Source and Destination
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');

  useEffect(() => {
    const carName = searchParams.get('carName');
    const dist = parseFloat(searchParams.get('distance'));
    const sourceLoc = searchParams.get('source');
    const destinationLoc = searchParams.get('destination');
    
    if (carName && !isNaN(dist)) {
      const car = CarListData.find(car => car.name === carName);
      if (car) {
        setSelectedCar(car);
        setDistance(dist);
        setSource(sourceLoc);
        setDestination(destinationLoc);
        const cost = (car.amount * dist).toFixed(2);
        setTotalAmount(cost);
        setDiscountedAmount(cost);
      } else {
        console.error("Car not found!");
      }
    } else {
      console.error("Invalid carName or distance!");
    }
  }, [searchParams]);

  const handleVoucherApply = () => {
    const validVoucher = "PM10";
    if (voucherCode === validVoucher) {
      const discount = (totalAmount * 0.10).toFixed(2);
      setDiscountedAmount((totalAmount - discount).toFixed(2));
    } else {
      setDiscountedAmount(totalAmount);
    }
  };

  const handlePayment = (paymentType) => {
    console.log({
      name,
      mobile,
      email,
      travellers,
      bookEntireCab,
      voucherCode,
      totalAmount: discountedAmount,
      paymentType,
      source,
      destination,
    });
  
    if (paymentType === 'online') {
      // Redirect to payment page with the amount
      // router.push('/payment?amount=' + (selectedCar.amount * distance).toFixed(2));
      router.push('/payment?amount=' + discountedAmount);
    } else if (paymentType === 'payAtDestination') {
      // Redirect to payment confirmation page
      router.push('/payment-confirm');
    } else {
      // Handle any other payment type or show an error
      alert('Invalid payment type');
    }
  
    alert(`Booking confirmed! Payment Method: ${paymentType}`);
  };

  if (!selectedCar) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-[22px] font-bold">Booking Details</h1>
      <div className="mt-4 border-[2px] p-4 rounded-lg">
        <h2 className="text-[20px] font-bold">{selectedCar.name}</h2>
        <p>Source: {source}</p>
        <p>Destination: {destination}</p>
        <p>Distance: {distance.toFixed(2)} miles</p>
        <p>Rate per mile: ${selectedCar.amount}</p>
        <p className="mt-2 text-[18px] font-bold">Total Amount: ${discountedAmount}</p>
      </div>

      <div className="mt-5">
        <h2 className="text-[20px] font-bold">Enter Your Details</h2>
        <form className="mt-4 space-y-4">
          <div>
            <label className="block font-bold">Name</label>
            <input
              type="text"
              className="border-[1px] p-2 w-full rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-bold">Mobile Number</label>
            <input
              type="tel"
              className="border-[1px] p-2 w-full rounded-lg"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-bold">Email Address</label>
            <input
              type="email"
              className="border-[1px] p-2 w-full rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-bold">Number of Travellers</label>
            <input
              type="number"
              className="border-[1px] p-2 w-full rounded-lg"
              value={travellers}
              onChange={(e) => setTravellers(e.target.value)}
              min="1"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="entireCab"
              className="mr-2"
              checked={bookEntireCab}
              onChange={(e) => setBookEntireCab(e.target.checked)}
            />
            <label htmlFor="entireCab" className="font-bold">Book Entire Cab</label>
          </div>

          <div>
            <label className="block font-bold">Use Voucher</label>
            <input
              type="text"
              className="border-[1px] p-2 w-full rounded-lg"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
            />
            <button
              type="button"
              className="mt-2 p-2 bg-blue-500 text-white rounded-lg"
              onClick={handleVoucherApply}
            >
              Apply Voucher
            </button>
          </div>
        </form>

        <div className="mt-6 flex justify-between">
          <button
            className="p-4 bg-green-500 text-white rounded-lg"
            onClick={() => handlePayment('online')}
          >
            Pay Online
          </button>
          <button
            className="p-4 bg-orange-500 text-white rounded-lg"
            onClick={() => handlePayment('payAtDestination')}
          >
            Pay at Destination
          </button>
        </div>

      </div>
    </div>
  );
}

export default BookingPage;
