import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import RNWeb from './RNWeb';

export default function App() {
  const [momoUri, setMomoUri] = useState(null);

  //for simplicity and demo sake, we're checking if the text
  // we have in the input field is up to 10 characters, that's how
  // we know we have a valid number. you have to do better validation
  //in your production app like checking if it's a valid number etc.

  //After we create a data object with info to be submitted to the Api
  //Note that the txt_ref has to be unique for every transaction. Thats why
  //we're using math.random to add a random number. you can uuid or anything you want.
  //Just make sure it's unique

  //We then make a post request to the flutterwave api with the data using fetch
  // you can use axios or any other package you want
  //the response contains a url we have to use to confirm the request
  //we then update our url state with the url from the response
  function handleOnChangeText(text) {
    if (text.length === 10) {
      let data = {
        tx_ref: 'AW-15' + (1000 + Math.floor(Math.random * 100000)),
        amount: '150',
        currency: 'GHS',
        network: 'MTN',
        email: 'awalmubarak@gmail.com',
        phone_number: text,
        redirect_url: 'https://codetraingh.com',
      };

      fetch('https://api.flutterwave.com/v3/charges?type=mobile_money_ghana', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer FLWSECK_TEST-b300859b27e75571299b7beb31bd2e56-X',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
          setMomoUri(data.meta.authorization.redirect);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }

  // a function to be called when the payment is completed
  // you can do anything you want after successfull payment like
  //navigating to a new screen etc.
  function closeWebView() {
    setMomoUri(null);
  }
  return (
    <View style={styles.container}>
      {/* Input field for users to enter their momo number */}
      <TextInput
        onChangeText={handleOnChangeText}
        style={{
          backgroundColor: 'yellow',
          fontSize: 30,
          marginHorizontal: 20,
        }}
      />

      {/* We display a webview for momo authorization if we have a valid url from
      the flutterwave api. Remember, we get a valid url from the response in
      handleOnchangeText above */}
      {momoUri !== null && <RNWeb uri={momoUri} closeWebView={closeWebView} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
});
