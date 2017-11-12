import React from 'react';
import ReactDOM from 'react-dom';
import Shtacks from './Shtacks';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render( < Shtacks / > , div);
});