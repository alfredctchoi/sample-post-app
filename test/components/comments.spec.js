import React from 'react'
import Comments from '../../src/js/components/comments'
import expect from 'expect'
import {shallow} from 'enzyme'
import Comment from '../../src/js/components/comment'

describe('Components', () => {
  describe('Comments', () => {
    it('should render itself with 2 children', () => {
      const props = {
        comments: [{
          id: 1,
          author: 'user 1',
          body: 'body 1'
        }, {
          id: 2,
          author: 'user 2',
          body: 'body 2'
        }]
      };
      const component = shallow(<Comments {...props}/>);
      const childrenEl = component.find(Comment);
      const listEl = component.find('ul.comment-list');
      expect(listEl.length).toBe(1);
      expect(childrenEl.length).toBe(2);
    });
    
    it('should render "No comments available"', () => {
      const props = {
        comments: []
      };
      const component = shallow(<Comments {...props}/>);
      const childrenEl = component.find(Comment);
      const errorEl = component.find('.text-center');
      const ulEl = component.find('.comment-list');
      expect(ulEl.length).toBe(0);
      expect(errorEl).toExist();
      expect(errorEl.text()).toBe('No comments available');
      expect(childrenEl.length).toBe(0);
    });
  });
});