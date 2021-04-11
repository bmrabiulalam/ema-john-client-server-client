import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import SimpleCardForm from './SimpleCardForm';
// import SplitCardForm from './SplitCardForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51IefVMCXfzigWLCoRF6vmrgd9D4Cwfu9j3MfyGcosASCu8JekcgVN1YVnpY2sAR2dFz0Xl1aWhUiU8bXgeLQnCDs00mvNxX71S');

const ProcessPayment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>
          <SimpleCardForm handlePayment={handlePayment} />
        </Elements>
    );
};

export default ProcessPayment;