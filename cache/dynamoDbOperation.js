
const AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const logger = require('../util/logger').getLogger();


module.exports.getUrl = async (urlInput) => {

    const params = {
        TableName: 'urlMetadataCollection',
        Key: {
            url: urlInput
        }
    }
    try {
        const data = await dynamoDb.get(params).promise();
        return data.Item;
    } catch (error) {
        logger.error(`Error Occured While Fetching the URL Item: ${error}`);
    }
}

module.exports.addUrl = async (urlInput, metadata) => {
    
    const params = {
        TableName: 'urlMetadataCollection',
        Item: {
            url: urlInput,
            metaData: metadata
        }
    }
    try {
        const data = await dynamoDb.put(params).promise();
        return data.Item;
    } catch (error) {
        logger.error(`Error Occured While Adding the URL and Metadata : ${error}`);
    }
}