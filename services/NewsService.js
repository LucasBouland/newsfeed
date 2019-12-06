import axios from 'axios';
const key = 'a20b31ac48b04fa399e1b38500a0f4fc';
const url = `https://newsapi.org/v2/everything?apiKey=${key}`;

class NewsService {
    getNewsByKeyword(keyword = 'bitcoin') {
        console.log(`${url}&q=${keyword}`);
        return axios.get(`${url}&q=${keyword}`);
    }
}

export default NewsService;