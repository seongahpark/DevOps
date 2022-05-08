const AWS = require('aws-sdk');
const sharp = require('sharp');
const s3 = new AWS.S3();
const sns = new AWS.SNS();

AWS.config.update({region : 'ap-northeast-2'})

exports.helloFromLambdaHandler = async (event, context) => {
    console.log(JSON.stringify(event));

    // s3 -> SQS -> Lambda로 과정이 변경되면서 이벤트 값이 변경
    const newEvent = JSON.parse(event.Records[0].body)

    const srcBucket = newEvent.Records[0].s3.bucket.name;
    const srcKey    = decodeURIComponent(newEvent.Records[0].s3.object.key.replace(/\+/g, " "))
    
    // 원본 버킷으로부터 파일 읽기
    const s3Object = await s3.getObject({
        Bucket: srcBucket,
        Key: srcKey
    }).promise()
    
    // 이미지 리사이즈, sharp 라이브러리가 필요합니다.
    const data = await sharp(s3Object.Body)
        .resize(200)
        .jpeg({ mozjpeg: true })
        .toBuffer()
    
    // 대상 버킷으로 파일 쓰기
    const result = await s3.putObject({
        Bucket: process.env.ThumbnailBucket, 
        Key: srcKey,
        ContentType: 'image/jpeg',
        Body: data,
        ACL: 'public-read'
    }).promise()

    const publishPromise = await sns.publish({
        Subject : 'S3에 새로운 썸네일이 도착했어요',
        Message : process.env.ThumbnailUrl + srcKey,
        TopicArn : process.env.TopicArn
    }).promise()

    console.log(publishPromise)

    return result
}
