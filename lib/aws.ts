import AWS from 'aws-sdk';

// AWS認証情報の設定
AWS.config.update({
  region: process.env.AWS_REGION || 'ap-northeast-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

// S3クライアントの初期化
export const s3Client = new AWS.S3();

// 後方互換性のために残す
export const s3 = s3Client;

// 他のAWSサービスのクライアントもここで初期化できます
// 例: export const dynamodb = new AWS.DynamoDB();

export default AWS; 