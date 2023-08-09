const https = require('https');

class ProxyController {
  handleGet(req, res) {
    https
      .get('https://interview.adpeai.com/api/v2/get-task', apiRes => {
        apiRes.pipe(res);
      })
      .on('error', err => {
        this.handleError(res, err);
      });
  }

  handlePost(req, res) {
    const apiReq = https.request(
      {
        hostname: 'interview.adpeai.com',
        path: '/api/v2/submit-task',
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
