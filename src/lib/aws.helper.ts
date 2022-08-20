import AWS from 'aws-sdk'

AWS.config.update({
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: process.env.AWS_ACESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

const s3 = new AWS.S3()

export const s3Upload = (Key: string, Body: AWS.S3.Body) => {
  return new Promise((resolve, reject) => {
    s3.upload(
      // 해시값과 확장자가 같으면 같은 파일이라고 인식하고 덮어씀
      {
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key,
        Body,
        ACL: 'public-read', // TODO: 배포 전 확인하기
      },
      (err, data) => {
        if (err) {
          reject(err)
        }

        resolve(data)
      }
    )
  })
}
