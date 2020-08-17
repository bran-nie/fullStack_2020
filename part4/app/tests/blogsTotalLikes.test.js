const listHelper = require('../utils/list_helper');

const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url:
            'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0,
    },
];

describe('total likes', () => {
    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog);
        expect(result).toBe(5);
    });
    test('when list has none blog equals the likes of that', () => {
        const result = listHelper.totalLikes([]);
        expect(result).toBe(0);
    });
});

describe('more favorite', () => {
    test('more favorite blog', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog);
        expect(result).toEqual(listWithOneBlog[0]);
    });
    test('no blog', () => {
        const result = listHelper.favoriteBlog([]);
        expect(result).toEqual(null);
    });
});

describe('more blogs author', () => {
    test('more blog', () => {
        const result = listHelper.moreBlogs(listWithOneBlog);
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            blogs: 1,
        });
    });
    test('no blog', () => {
        const result = listHelper.moreBlogs([]);
        expect(result).toEqual({});
    });
});

describe('more likes author', () => {
    test('more likes', () => {
        const result = listHelper.moreLikes(listWithOneBlog);
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 5,
        });
    });
    test('no blog', () => {
        const result = listHelper.moreLikes([]);
        expect(result).toEqual({});
    });
});
