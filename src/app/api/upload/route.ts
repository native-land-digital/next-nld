import { createPresignedPost } from '@aws-sdk/s3-presigned-post'
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: Request) {
  const { filename, contentType } = await request.json()

  try {
    const client = new S3Client({ region: process.env.AWS_REGION })
    const { url, fields } = await createPresignedPost(client, {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: uuidv4(),
      Conditions: [
        ['content-length-range', 0, 10485760], // up to 10 MB
        ['starts-with', '$Content-Type', contentType],
      ],
      Fields: {
        acl: 'public-read',
        'Content-Type': contentType,
      },
      Expires: 600, // Seconds before the presigned post expires. 3600 by default.
    })

    return Response.json({ url, fields })
  } catch (error) {
    return Response.json({ error: error.message })
  }
}

export async function DELETE(req: NextRequest) {
	const key = req.nextUrl.searchParams.get('key');
  if(key) {
    const bucketParams = { Bucket: process.env.AWS_BUCKET_NAME, Key: key };
    try {
      const client = new S3Client({ region: process.env.AWS_REGION })
      const data = await client.send(new DeleteObjectCommand(bucketParams));
      return Response.json({ deleted : key })
    } catch (err) {
      return Response.json({ error: err })
    }
  } else {
    return NextResponse.json({ error : "No key provided" }, { status: 500 });
  }
}
