# URL Parser

## User interface for URL Parser: 
### Developed with React.JS, Deployed in S3

http://url-parser-client.s3-website.ca-central-1.amazonaws.com/


## URL Parser RESTful API , Used Serverless Framework for deployment
### Cacheing with DynamoDB

```
Request URL: https://b4y0pxt7xc.execute-api.ca-central-1.amazonaws.com/dev/url-parse
Request Method: POST
Request Payload: 
{
    "url": "url to be parsed"
}
```

### Curl Command
```
curl --location --request POST 'https://b4y0pxt7xc.execute-api.ca-central-1.amazonaws.com/dev/url-parse' \
--header 'Content-Type: application/json' \
--data-raw '{
    "url": "url to be parsed"
}'
```

