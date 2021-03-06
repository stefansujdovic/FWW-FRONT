import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from "next/app";
import withRedux from "next-redux-wrapper";
import nextCookie from 'next-cookies';


const reducer = (state = { user: false }, action) => {
  switch (action.type) {
    case 'USER':
      return { ...state, user: action.payload }
    default:
      return state
  }
};

/**
* @param {object} initialState
* @param {boolean} options.isServer indicates whether it is a server side or client side
* @param {Request} options.req NodeJS Request object (not set when client applies initialState from server)
* @param {Request} options.res NodeJS Request object (not set when client applies initialState from server)
* @param {boolean} options.debug User-defined debug mode param
* @param {string} options.storeKey This key will be used to preserve store in global namespace for safe HMR 
*/
const makeStore = (initialState, options) => {
  return createStore(reducer, initialState);
};



class MyApp extends App {



  static async getInitialProps({ Component, ctx }) {


    const { user } = nextCookie(ctx);

    if (user === undefined) {
      ctx.store.dispatch({ type: 'USER', payload: false })
    } else {
      ctx.store.dispatch({ type: 'USER', payload: user })
    }

    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};


    return { pageProps };

  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  }

}

export default withRedux(makeStore)(MyApp);