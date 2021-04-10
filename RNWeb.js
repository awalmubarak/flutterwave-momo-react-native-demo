import * as React from 'react';
import { WebView } from 'react-native-webview';

export default class RNWeb extends React.Component {
  //variable to hold reference of the webview
  webview = null;
  render() {
    return (
      <WebView
        source={{
          uri: this.props.uri,
        }}
        style={{ marginTop: 20, marginHorizontal: 15 }}
        originWhitelist={['*']}
        ref={(ref) => (this.webview = ref)}
        onNavigationStateChange={this.handleWebViewNavigationStateChange}
      />
    );
  }

  //this function will be called when the url of your webview changes
  handleWebViewNavigationStateChange = (newNavState) => {
    // newNavState looks something like this:
    // {
    //   url?: string;
    //   title?: string;
    //   loading?: boolean;
    //   canGoBack?: boolean;
    //   canGoForward?: boolean;
    // }
    const { url } = newNavState;
    if (!url) return;

    // one way to handle a successful payment is to check if the redirect is
    //same as the redirect we specified when creating the transaction.
    //if it is, then we're done here so we just close the webview
    if (url.includes('codetraingh.com')) {
      this.webview.stopLoading();
      this.props.closeWebView();
    }
  };
}
