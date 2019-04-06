import React from 'react';

import { mount } from 'enzyme';

import Root from 'Root';
import CommentBox from 'components/CommentBox';

let wrapper;

beforeEach(() => {
    // Could use shallow renderer because no child components
    // - using full DOM (mount) renderer just as an example
    wrapper = mount(
        <Root>
            <CommentBox />
        </Root>
    );
});

afterEach(() => {
    wrapper.unmount();
});

it('has a text area and 2 buttons', () => {
    
    expect(wrapper.find('textarea').length).toEqual(1);
    expect(wrapper.find('button').length).toEqual(2);
    
});

describe('text area', () => {
    
    beforeEach(() => {
       // Pass a mock change event object with a specific value
       wrapper.find('textarea').simulate('change', { 
           target: { value: 'new comment' } 
       });
       
       // Call to setState in component results in an asynchronous re-rendering, 
       // but for testing purposes we need the component to re-render straight away
       // so that we know it's re-rendered before specifiying an assertion
       wrapper.update();
    });
    
    it('has a text area that users can type in', () => {
       
       expect(wrapper.find('textarea').prop('value')).toEqual('new comment');
       
    });
    
    it('has a text area cleared on form submission', () => {
        
        // Could test this as well, but repeats the test above
        // expect(wrapper.find('textarea').prop('value')).toEqual('new comment');
       
        wrapper.find('form').simulate('submit');
        
        wrapper.update();
        
        expect(wrapper.find('textarea').prop('value')).toEqual('');
        
    });
});
