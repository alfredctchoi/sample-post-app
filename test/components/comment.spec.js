import React from 'react'
import {shallow} from 'enzyme'
import expect from 'expect'
import Comment from '../../src/js/components/comment'

const setup = () => {
  const props = {
    comment: {
      name: 'user',
      body: 'text text text'
    }
  };

  const component = shallow(<Comment {...props} />);

  return {
    props,
    component
  }
};

describe('Components', () => {
  describe('comment', () => {
    it('should render itself', () => {
      const {component} = setup();
      const authorEl = component.find('div.author');
      const bodyEl = component.find('div.comment-content');
      expect(component.find('li').hasClass('comment')).toBeTruthy();
      expect(authorEl).toExist();
      expect(bodyEl).toExist();
      expect(bodyEl.text()).toEqual('text text text');
      expect(authorEl.text()).toEqual('user:');
    });

  })
});