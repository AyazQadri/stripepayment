import React, {useEffect} from 'react';
import {CardField, CardForm, StripeContainer, initStripe, useStripe} from '@stripe/stripe-react-native';
import {Button, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';

interface Props 
{
    onCardFormComplete: (cardDetails: any) => void
    cardToken: string;
    handleSubmit: () => void;
}

const PaymentScreen = ({onCardFormComplete, cardToken, handleSubmit,}: Props) =>
{
    useEffect(() =>
    {
        async function initialize()
        {
            await initStripe({publishableKey: "pk_test_TYooMQauvdEDq54NiTphI7jx"});
        }
        initialize();
    }, []);

    return (
        <View style={styles.container}>
            <StripeContainer keyboardShouldPersistTaps={false}>
                <ScrollView style={styles.container}
                    accessibilityLabel="payment-screen"
                    keyboardShouldPersistTaps="always"
                >
                    <CardForm
                        style={styles.cardForm}
                        onFormComplete={(cardDetails: any) => onCardFormComplete (cardDetails)}
                    />
                    <TouchableOpacity 
                        activeOpacity={0.7} 
                        disabled={!cardToken} 
                        style={{marginTop: 20}}
                    >
                        <Button 
                            title="Pay" 
                            onPress={handleSubmit} 
                            disabled={!cardToken} 
                        />
                    </TouchableOpacity>
                </ScrollView>
            </StripeContainer>
        </View>
        // <CardField
        //     postalCodeEnabled={true}
        //     placeholders={{
        //         number: '*** *** **** 4242',
        //     }}
        //     cardStyle={{
        //         backgroundColor: '#FFFFFF',
        //         textColor: '#000000',
        //     }}
        //     style={{
        //         width: '100%',
        //         height: 50,
        //         marginVertical: 30,
        //     }}
        //     onCardChange={(cardDetails) =>
        //     {
        //         onCardFormComplete (cardDetails)
        //     }}
        // />
    );
}
export default PaymentScreen;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 50,
        paddingHorizontal: 10,
        width: '100%',
        flex: 1,
    },
    cardForm: {
        flexGrow: 1,
        minHeight: 260,
        opacity: 0.54,
    },
});