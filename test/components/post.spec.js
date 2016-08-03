import React from 'react'
import {shallow} from 'enzyme'
import expect from 'expect'
import Post from '../../src/js/components/post'
import PostComments from '../../src/js/containers/post-comments'

const setup = (isSelected) => {
  const props = {
    post: {
      title: 'title',
      body: 'body',
      id: 1
    },
    onPostSelect: expect.createSpy(),
    isSelected:  isSelected === true
  };

  const component = shallow(<Post {...props} />);

  return {
    props,
    component
  }
};

describe('Components', () => {
  describe('post', () => {
    it('should render itself', () => {
      const {component} = setup();
      const headingEl = component.find('div.heading');
      const bodyEl = component.find('div.body');

      expect(bodyEl.length).toBe(1);
      expect(headingEl.length).toBe(1);
      expect(component.find('li').hasClass('post')).toBeTruthy();
    });

    it('should render the comments when selected', () => {
      const {component} = setup(true);
      const headingEl = component.find('div.heading');
      const bodyEl = component.find('div.body');

      expect(bodyEl.length).toBe(1);
      expect(headingEl.length).toBe(1);
      expect(component.find('li').hasClass('post')).toBeTruthy();
      expect(component.find(PostComments).length).toBe(1);
    });

    it('should trigger an action when clicked', () => {
      const {component, props} = setup();
      component.simulate('click');
      expect(props.onPostSelect.calls.length).toBe(1);
    });
  });
});