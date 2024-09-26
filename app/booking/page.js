"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { CarListData } from './../../utils/CarListData';
import Image from 'next/image';
import './page.css'

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

    // Loading state
    const [loading, setLoading] = useState(false);

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

    const handlePayment = async (paymentType) => {
        setLoading(true); // Set loading to true when payment process starts
        const finalAmount = discountedAmount * travellers;
        console.log({
            name,
            mobile,
            email,
            travellers,
            bookEntireCab,
            voucherCode,
            totalAmount: finalAmount,
            paymentType,
            source,
            destination,
        });

        // Send form data to the API route
        try {
            await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    mobile,
                    source,
                    destination,
                    totalAmount: finalAmount,
                    paymentType,
                }),
            });
            if (paymentType === 'online') {
                router.push('/payment?amount=' + finalAmount);
            } else if (paymentType === 'payAtDestination') {
                router.push('/payment-confirm');
            } else {
                alert('Invalid payment type');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            alert('An error occurred while sending the email.');
        } finally {
            setLoading(false); // Ensure loading is false after the process completes
        }
    };

    if (!selectedCar) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 md:p-6" style={{ paddingTop: '150px' }}>
            {loading ? (
                <div className="flex flex-col items-center justify-center">
                    <Image src="/loading-spinner.gif" alt="Loading..." width={50} height={50} />
                    <p className="text-gray-500 mt-2">Processing your payment, please wait...</p>
                </div>
            ) : (
                <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left Section: Image */}
                    <div className="hidden md:block">
                    <Image
                            src="/your-image.jpg"  // Replace with your image path
                            alt="Booking Image"
                            layout="responsive"
                            width={500}
                            height={500}
                            className="rounded-lg shadow-md"
                            style={{margin:'10px'}}
                        />
                        <Image
                            src="/your-image2.jpg"  // Replace with your image path
                            alt="Booking Image"
                            layout="responsive"
                            width={500}
                            height={500}
                            className="rounded-lg shadow-md"
                            style={{margin:'10px'}}
                        />
                        <Image
                            src="/your-image.svg"  // Replace with your image path
                            alt="Booking Image"
                            layout="responsive"
                            width={500}
                            height={500}
                            className="rounded-lg shadow-md"
                            style={{margin:'10px'}}
                        />
                    </div>

                    {/* Right Section: Booking Form and Details */}
                    <div className="md:col-span-2 rounded-lg shadow-md p-6 md:p-8" style={{ backgroundColor: '#ffd457' }}>
                        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Booking Details</h1>
                        <div className="bg-gray-100 p-6 rounded-lg shadow-sm mb-6">
                            <h2 className="text-xl font-semibold text-gray-700 mb-2">{selectedCar.name}</h2>
                            <p className="text-gray-600"><strong>Source:</strong> {source}</p>
                            <p className="text-gray-600"><strong>Destination:</strong> {destination}</p>
                            <p className="text-gray-600"><strong>Rate per person:</strong> ₹{discountedAmount}</p>
                            <p className="text-lg font-bold text-gray-800 mt-4">Total Amount: ₹{discountedAmount * travellers}</p>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-gray-800">Enter Your Details</h2>

                            <form className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 font-bold">Name</label>
                                    <input
                                        type="text"
                                        className="w-full border-2 border-gray-200 p-3 rounded-lg focus:outline-none focus:border-blue-500"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-bold">Mobile Number</label>
                                    <input
                                        type="tel"
                                        className="w-full border-2 border-gray-200 p-3 rounded-lg focus:outline-none focus:border-blue-500"
                                        value={mobile}
                                        onChange={(e) => setMobile(e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-bold">Email Address</label>
                                    <input
                                        type="email"
                                        className="w-full border-2 border-gray-200 p-3 rounded-lg focus:outline-none focus:border-blue-500"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-bold">Number of Travellers</label>
                                    <input
                                        type="number"
                                        className="w-full border-2 border-gray-200 p-3 rounded-lg focus:outline-none focus:border-blue-500"
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
                                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                        checked={bookEntireCab}
                                        onChange={(e) => setBookEntireCab(e.target.checked)}
                                    />
                                    <label htmlFor="entireCab" className="ml-2 text-gray-700 font-bold">Book Entire Cab</label>
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-bold">Use Voucher</label>
                                    <input
                                        type="text"
                                        className="w-full border-2 border-gray-200 p-3 rounded-lg focus:outline-none focus:border-blue-500"
                                        value={voucherCode}
                                        onChange={(e) => setVoucherCode(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="mt-2 w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600"
                                        onClick={handleVoucherApply}
                                    >
                                        Apply Voucher
                                    </button>
                                </div>
                            </form>

                            <div className="mt-6 flex justify-between">
                                <button
                                    className="w-full mr-2 bg-green-500 text-white p-4 rounded-lg font-semibold hover:bg-green-600"
                                    onClick={() => handlePayment('online')}
                                >
                                    Pay Online
                                </button>
                                <button
                                    className="w-full ml-2 bg-orange-500 text-white p-4 rounded-lg font-semibold hover:bg-orange-600"
                                    onClick={() => handlePayment('payAtDestination')}
                                >
                                    Pay at Destination
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BookingPage;
