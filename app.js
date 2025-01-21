require('dotenv').config();

const express = require('express')
const app = express()
const port = process.env.NODE_ENV === 'development' ? 4003 : 443
const path = require('path');
const jwt = require('jsonwebtoken');
const requestIp = require('request-ip');
const geoip = require('geoip-lite');
const accepts = require('accepts');
const uap = require('ua-parser-js');

const beaconPath = path.join(__dirname, 'assets/icons/nut-beacon.gif');

app.get('/api/notifications/emails/beacon/:trackingJwt.gif',
  async function (req, res, next) {
    const { trackingJwt } = req.params;

    try {
      console.log("trackingJwt", trackingJwt);
      const ip = requestIp.getClientIp(req);
      const geo = geoip.lookup(ip || "");
      let ua = uap(req.headers['user-agent']);
      const accept = accepts(req);

      const trackingData = jwt.verify(trackingJwt, process.env.AUTH_SECRET);
      const { userId, emailId } = trackingData;

      const data = {
        ip,
        geo,
        ua,
        langs: accept.languages(),
        charsets: accept.charsets(),
      };

      console.log('trackingData:', JSON.stringify(data, null, 2));

      res.sendFile(beaconPath);
    } catch (error) {
      console.log("error", error);
    }
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
