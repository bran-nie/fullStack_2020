const devUrl = 'http://localhost:3001';

const slsUrl = 'https://service-7xtkqqkk-1252363972.gz.apigw.tencentcs.com';
const prodUrl = slsUrl + '/release';

const isDev = process.env.NODE_ENV === 'development';

const baseUrl = isDev ? devUrl : prodUrl;

console.log('cur url: ', baseUrl);
console.log(process.env);

export default baseUrl;
