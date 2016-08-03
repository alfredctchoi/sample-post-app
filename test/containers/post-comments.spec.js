import React from 'react'
import {PostComments} from '../../src/js/containers/post-comments'
import {shallow} from 'enzyme'
import expect from 'expect';
import Comments from '../../src/js/components/comments'

describe('Containers', () => {
    describe('post-comments', () => {
        it('should show the loading container', () => {
            const props = {
                isLoading: true
            };
            const component = shallow(<PostComments {...props}/>);
            const loadingEl = component.find('div.text-center');

            expect(loadingEl.length).toBe(1);
            expect(loadingEl.text()).toBe('Loading...');
        });

        it('should render the comments section', () => {
            const props = {
                isLoading: false,
                comments: [{id: 1}, {id: 2}],
                classes: 'test'
            };
            const component = shallow(<PostComments {...props} />);
            const dividerEl = component.find('hr.divider');
            const commentsContainer = component.find('div.comments-container.test');

            expect(dividerEl.length).toBe(1);
            expect(commentsContainer.length).toBe(1);
            expect(commentsContainer.find('div.comment-heading').length).toBe(1);
            expect(commentsContainer.find(Comments).length).toBe(1);
            expect(commentsContainer.find('input.input').length).toBe(1);
        })
    })
});