import React, {useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {CardField, CardForm, StripeContainer, StripeProvider, createToken, useStripe} from '@stripe/stripe-react-native';
import PaymentScreen from "../payment.component.tsx/payment.component";

const StripeCardForm = () => 
{
    const {confirmPayment} = useStripe()
    const [cardToken, setCardToken] = useState('')
    const [cardDetails, setCardDetails] = useState()

    const onFormComplete = async (cardDetails: any) =>
    {
        if (!cardDetails.complete)
        {
            if (cardToken.length)
            {
                setCardToken('');
            }
            return;
        }
        try
        {
            const {token} = await createToken({type: 'Card'});
            if (typeof token?.id === 'string' || cardToken.length)
            {
                setCardToken(token?.id || '');
                setCardDetails(cardDetails);
            }
        } catch (err)
        {
            console.error(`Error generating card token: ${err}`);
        }
    };

    const submitPayButton = async() => 
    {
        try 
        {
            // HERE ENTER CUSTOMER'S BILLING INFORMATION 
            const billingDetails = {
                email: 'customer@gmail.com',
            };

            const {paymentIntent, error} = await confirmPayment("sk_test_4eC39HqLyjWDarjtT1zdp7dc", {
                paymentMethodType: 'Card',
                paymentMethodData: {
                    billingDetails,
                },
            });

            if (error)
            {
                console.log('Payment confirmation error', error);
            } 
            else if (paymentIntent)
            {
                console.log('Success from promise', paymentIntent);
            }
        }
        catch (error) 
        {
            console.log ("try catch api error", error);
        }
    }

    return (
        <View style={styles.container}>
            <StripeProvider
                publishableKey={'pk_test_TYooMQauvdEDq54NiTphI7jx'}
                merchantIdentifier="merchant.identifier"
            >
                <PaymentScreen
                    cardToken={cardToken}
                    handleSubmit={submitPayButton}
                    onCardFormComplete={(cardDetails) => onFormComplete(cardDetails)}
                />
            </StripeProvider>
        </View>
    )
}

export default StripeCardForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

