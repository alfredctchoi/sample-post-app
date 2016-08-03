import React from 'react'
import {PostList} from '../../src/js/containers/post-list'
import {shallow} from 'enzyme'
import expect from 'expect';
import Posts from '../../src/js/components/posts'

describe('Containers', () => {
    describe('post-list', () => {
        it('should show the loading container', () => {
            const props = {
                isLoading: true
            };
            const component = shallow(<PostList {...props}/>);
            const loadingEl = component.find('.loading');

            expect(loadingEl.length).toBe(1);
            expect(loadingEl.text()).toBe('Loading...');
        });
        
        it('should render the Posts component', () => {
           const props = {
               isLoading: false,
               posts: [{id: 1}, {id: 2}],
               selectedPostId: null,
               onPostSelect: expect.createSpy()
           };

            const component = shallow(<PostList {...props}/>);
            const postEl = component.find(Posts);
            expect(postEl.length).toBe(1)
        });
        
        it('should show "No posts found" error message', () => {
            const props = {
                isLoading: false,
                posts: [],
                selectedPostId: null,
                onPostSelect: expect.createSpy()
            };

            const component = shallow(<PostList {...props}/>);
            const notFoundEl = component.find('div.posts-not-found');
            expect(notFoundEl.length).toBe(1);
            expect(notFoundEl.text()).toBe('No posts found.');
        });
    })
});