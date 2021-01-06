const dummy = (blogs) => {
    console.log(blogs);
    return 1;
};

const totalLikes = (blogs) => {
    const fn = (pre, next) => {
        return pre + next.likes;
    };
    return blogs.length === 0 ? 0 : blogs.reduce(fn, 0);
};

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null;
    let r = blogs[0];
    for (let v of blogs) {
        if (v.likes > r.likes) r = v;
    }
    return r;
};

const moreBlogs = (data) => {
    const replaceResult = (author, blogs) => {
        return { author, blogs };
    };

    const initResult = (author, blogs) => {
        return replaceResult(author, blogs);
    };

    let r = Object.create(null);
    let obj = {};
    data.forEach((v) => {
        const author = v.author;
        // 初始化
        if (!r.author) {
            r = initResult(author, 1);
        }

        if (Object.prototype.hasOwnProperty.call(obj, author)) {
            obj[author] += 1;
            if (r.blogs < obj[author]) {
                r = replaceResult(author, obj[author]);
            }
        } else {
            obj[author] = 1;
        }
    });
    return r;
};

const moreLikes = (data) => {
    const replaceResult = (author, likes) => {
        return { author, likes };
    };

    const initResult = (author, likes) => {
        return replaceResult(author, likes);
    };

    let r = Object.create(null);
    let obj = {};
    data.forEach((v) => {
        const author = v.author;
        // 初始化
        if (!r.author) {
            r = initResult(author, v.likes);
        }

        if (Object.prototype.hasOwnProperty.call(obj, author)) {
            obj[author] += v.likes;
            if (r.likes < obj[author]) {
                r = replaceResult(author, obj[author]);
            }
        } else {
            obj[author] = v.likes;

            if (r.likes < obj[author]) {
                r = replaceResult(author, obj[author]);
            }
        }
    });
    return r;
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    moreBlogs,
    moreLikes,
};
