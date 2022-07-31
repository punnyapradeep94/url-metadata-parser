'use strict';
const urlMetadata = require('url-metadata');
const dynamoDB = require('./cache/dynamoDbOperation');
const logger = require('./util/logger').getLogger();


module.exports.parse = async (event) => {

  const urlInput = JSON.parse(event.body).url;

  try {

    const urlItem = await dynamoDB.getUrl(urlInput);

    if (urlItem) {

      logger.info(`URL Cached Item found Case, Send saved metadata as output`);

      const metadata = JSON.parse(urlItem.metaData);

      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify(metadata),
      };

    } else {

      logger.info(`URL Cached Item not found Case, then parse the url and save in DB`);

      const metadata = await urlMetadata(urlInput);
      await dynamoDB.addUrl(urlInput, JSON.stringify(metadata));
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true 
        },
        body: JSON.stringify(metadata),
      };

    }
  } catch (error) {

    logger.info(`Error Occured While Parsing the Input URL : ${error}`);

    return {
      statusCode: error.statusCode,
      body: JSON.stringify(error),
    };
  }
};
