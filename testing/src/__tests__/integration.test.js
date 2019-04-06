import React from 'react';

import { mount } from 'enzyme';
import moxios from 'moxios';

import Root from 'Root';
import App from 'components/App';

beforeEach(() => {
    moxios.install();
    moxios.stubRequest('https://jsonplaceholder.typicode.com/comments', {
        status: 200,
        response: [
            { name: 'Fetched #1' },
            { name: 'Fetched #2' },
            { name: 'Fetched #3' }
        ]
    });
});

afterEach(() => {
    moxios.uninstall();
});

// Asynchronous calls confuse Jest as to when the test is complete
//  - we have to signal completion to Jest by using the 'done' callback
it('can fetch a list of comments and display them', (done) => {

    // Render the entire app
    const wrapper = mount(
        <Root>
            <App />
        </Root>
    );
    
    // Find the 'Fetch Comments' button
    wrapper.find('.fetch-comments').simulate('click');
    
    // Expect to find a list of comments after a slight wait
    // - wait required to allow moxios to reply with data
    
    // Using setTimeout with fixed delay is one way to achieve
    // the necessary wait but it is imprecise...and possibly flawed
    
    // setTimeout(() => {
    //     wrapper.update();
    //     expect(wrapper.find('li').length).toEqual(3);
    //     done();
    //     wrapper.unmount();
    // }, 100);

    moxios.wait(() => {
        wrapper.update();
        expect(wrapper.find('li').length).toEqual(3);
        done();
        wrapper.unmount();
    });
    
});