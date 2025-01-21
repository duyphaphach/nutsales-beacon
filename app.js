const express = require('express')
const app = express()
const port = 4001
const path = require('path');
const jwt = require('jsonwebtoken');

const beaconPath = path.join(__dirname, 'assets/icons/nut-beacon.gif');
const secret = "TdCFWZ7AmhjvaFyTNiQR/+6rC3gYqVv3nsEZ8CPUTgk="

app.get('/api/notifications/emails/beacon/:trackingJwt.gif',
  async function (req, res, next) {
    const { trackingJwt } = req.params;
    try {
      console.log("trackingJwt", trackingJwt);
      // Verify and decode the JWT (trackingJwt)
      const trackingData = jwt.verify(trackingJwt, secret);

      // Extract required fields from the JWT payload (e.g., userId, emailId, etc.)
      const { userId, emailId } = trackingData;

      console.log('data', { userId, emailId })

      const logEntry = {
        userId,
        emailId,
        timestamp: new Date(),
      };

      res.sendFile(beaconPath);
    } catch (error) {
      console.log("error", error);
    }
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
