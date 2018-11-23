import WebFont from 'webfontloader';
import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import HanoiGame from './components/HanoiGame';
import * as serviceWorker from './serviceWorker';

WebFont.load({
  google: {
    families: ['Droid Sans', 'Droid Serif']
  }
});

ReactDOM.render(<HanoiGame />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
