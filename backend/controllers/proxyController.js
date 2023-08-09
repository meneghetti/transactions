const https = require('https');

class ProxyController {

  handleGet(req, res) {
    https
      .get('https://interview.adpeai.com/api/v2/get-task', apiRes => {
        if (!res.headersSent) {
          res.writeHead(apiRes.statusCode);
          apiRes.pipe(res);
        }
      })
      .on('error', err => {
        this.handleError(res, err);
      });
  }
  
  handlePost(req, res) {
    const options = {
        hostname: 'interview.adpeai.com',
        path: '/api/v2/submit-task',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(req.body)
        }
    };

    const apiReq = https.request(options, apiRes => {
        if (!res.headersSent) {
            res.writeHead(apiRes.statusCode);
            apiRes.pipe(res);
        }
    });

    apiReq.write(req.body);
    apiReq.end();

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