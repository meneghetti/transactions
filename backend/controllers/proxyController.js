const https = require('https');
const url = require('url');

class ProxyController {
  constructor() {
    this.apiUrl = 'https://interview.adpeai.com/api/v2';
  }

  handleGet(req, res) {
    https
      .get(`${this.apiUrl}/get-task`, apiRes => {
        apiRes.pipe(res);
      })
      .on('error', err => {
        this.handleError(res, err);
      });
  }

  handlePost(req, res) {
    const apiReq = https.request(
      {
        hostname: this.apiUrl,
        path: '/submit-task',
        method: 'POST',
      },
      apiRes => {
        apiRes.pipe(res);
      }
    );

    req.pipe(apiReq);

    apiReq.on('error', err => {
      this.handleError(res, err);
    });
  }

  handleError(res, err) {
    console.error(err);
    res.writeHead(500);
    res.end('Internal Server Error');
  }
}

module.exports = ProxyController;
