import { createPresignedPost } from '@aws-sdk/s3-presigned-post'
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getToken } from "next-auth/jwt"
import { v4 as uuidv4 } from 'uuid'

export async function POST(req) {
  const token = await getToken({ req })

	if(token && token.id) {
		const user = await prisma.user.findUnique({
			where : { id : parseInt(token.id) },
			select : {
				permissions : true
			}
		});
		if(user.permissions.includes('research')) {
      const { contentType } = await req.json()

      try {
        const client = new S3Client({ region: process.env.AWS_REGION })
        const { url, fields } = await createPresignedPost(client, {
          Bucket: process.env.AWS_NEXT_BUCKET_NAME,
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
  	    return NextResponse.json({ error : `Something went wrong with the upload. Here is the error message: ${JSON.stringify(error.message)}` }, { status: 500 });
      }
    } else {
      return NextResponse.json({ error : `You do not have permission to access this endpoint` }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error : `You do not have permission to access this endpoint` }, { status: 500 });
  }
}

export async function DELETE(req) {
  const token = await getToken({ req })

	if(token && token.id) {
		const user = await prisma.user.findUnique({
			where : { id : parseInt(token.id) },
			select : {
				permissions : true
			}
		});
		if(user.permissions.includes('research')) {
    	const key = req.nextUrl.searchParams.get('key');
      if(key) {
        const bucketParams = { Bucket: process.env.AWS_NEXT_BUCKET_NAME, Key: key };
        try {
          const client = new S3Client({ region: process.env.AWS_REGION })
          await client.send(new DeleteObjectCommand(bucketParams));
          return Response.json({ deleted : key })
        } catch (err) {
          return Response.json({ error: err })
        }
      } else {
        return NextResponse.json({ error : "No key provided" }, { status: 500 });
      }
    } else {
      return NextResponse.json({ error : `You do not have permission to access this endpoint` }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error : `You do not have permission to access this endpoint` }, { status: 500 });
  }
}
