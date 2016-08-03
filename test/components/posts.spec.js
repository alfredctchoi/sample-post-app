import React from 'react'
import expect from 'expect'
import Posts from '../../src/js/components/posts'
import {shallow} from 'enzyme'

describe('Components', () => {
  describe('posts', () => {
    it('should render itself', () => {
      const component = shallow(<Posts/>);
      expect(component.length).toBe(1);
    });

    it('should have 2 children', () => {
      const props = {
        posts: [{id: 1}, {id: 2}]
      };
      const component = shallow(<Posts {...props}/>);
      expect(component.length).toBe(1);
      expect(component.children().length).toBe(2);
    });
  })
});