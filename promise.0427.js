const axios = require('axios');
const nodeHtmlParser = require('node-html-parser');
/*
sites array를 받아서
site meta[name="title"] content
 */
function getTitles2(urls) {
    const getTitle = (url) => {
        return axios.get(url)
            .then(res => {
                const root = nodeHtmlParser.parse(res.data);
                const titleMeta = root.querySelector('meta[property="og:title"]');
                if (titleMeta)
                    return titleMeta._attrs['content'];
                else return '';
            })
    }

    return Promise.all(urls.map(url => {
        return getTitle(url);
    }));
}

function getTitles(url1, url2, url3) {
    const titles = [];
    const getTitle = (url) => {
        return axios.get(url)
            .then(res => {
                const root = nodeHtmlParser.parse(res.data);
                const titleMeta = root.querySelector('meta[property="og:title"]');
                if (titleMeta)
                    return titleMeta._attrs['content'];
                else return '';
            })
    }
    return getTitle(url1).then(title => {
        titles.push(title);
        return getTitle(url2);
    }).then(title => {
        titles.push(title);
        return getTitle(url3);
    }).then(title => {
        titles.push(title);
        return titles;
    });
}




getTitles2(['https://github.com', 'https://npmjs.com', 'https://netflix.com', 'https://netflix.com'])
.then(res => console.log(res));

getTitles('https://github.com', 'https://npmjs.com', 'https://netflix.com')
    .then(res => console.log(res));
