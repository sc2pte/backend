/**
 * @file    v0 Config route file.
 * @author  Łukasz Wójcik
 * @license MIT
 * @since   2018-06-19
 */

const router = require('express').Router();
const cache = require('../../config/cache');
const apicache = require('apicache').options({ debug: cache.debug }).middleware;

const { getConfig } = require('../../controllers/config/get');
const saveConfig = require('../../controllers/config/save');

router.get('/:channelId', apicache(cache.request), async (req, res) => {
  try {
    const { channelId } = req.params;
    const { token } = req.headers;
    const response = await getConfig(channelId, token);
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(400).json({ status: 400, message: 'Bad request' });
  }
});

router.post('/:channelId', async (req, res) => {
  try {
    const { channelId } = req.params;

    const {
      server,
      playerid,
      region,
      name,
      token,
    } = req.headers;

    const configObject = {
      channelId,
      server,
      playerid,
      region,
      name,
      token,
    };

    const response = await saveConfig(configObject);
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(400).json({ status: 400, message: 'Bad request' });
  }
});

module.exports = router;
