import React, { useRef, useEffect } from 'react';

export default function PayPalIntegration() {
    const paypalRef = useRef();

    useEffect(() => {
        // Ensure PayPal SDK is loaded before calling Buttons
        if (window.paypal) {
            window.paypal.Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: '10.00', // Specify the amount here
                                },
                            },
                        ],
                    });
                },
                onApprove: (data, actions) => {
                    return actions.order.capture().then((details) => {
                        alert(`Transaction completed by ${details.payer.name.given_name}`);
                        // You can handle the payment success here, such as updating the backend
                    });
                },
                onError: (err) => {
                    console.error('PayPal Checkout Error:', err);
                },
            }).render(paypalRef.current); // Render PayPal button into the container
        }
    }, []);

    return (
        <div>
            <h2>Pay with PayPal</h2>
            <div ref={paypalRef} style={{ width: '300px', margin: 'auto' }}></div>
        </div>
    );
}
