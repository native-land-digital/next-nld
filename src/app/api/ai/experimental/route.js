import { NextResponse } from "next/server";
import { deepseek } from '@ai-sdk/deepseek';
import { streamText } from 'ai';

export const maxDuration = 30;

export const POST = async (req) => {

	// const secret = req.nextUrl.searchParams.get('secret');
	// if(secret === process.env.MOBILE_APP_SECRET) {
	const body = await req.json();

	if (!body.messages) {
		return NextResponse.json({ error : "Your message wasn't sent properly." }, { status: 400 });
	} else {

		try {

			const messagesToSend = [{ role: 'system', content: body.systemPrompt }];

			body.messages.forEach(message => {
				messagesToSend.push({
					role : message.type === 'bot' ? 'assistant' : 'user',
					content : typeof message.message === 'string' ? message.message : message.message.props.dangerouslySetInnerHTML["__html"]
				})
			})

	    const textStream = await streamText({
        model : deepseek('deepseek-chat'),
	      messages: messagesToSend,
				// maxTokens: 200,
				temperature : 1.3,
	    });

      return textStream.toDataStreamResponse();

		} catch (err) {
      console.log(err)
  	 	return NextResponse.json({ error : `Error in querying the AI. ${JSON.stringify(err)}` }, { status: 500 });
    }

	}
}
