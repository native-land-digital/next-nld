import { NextResponse } from "next/server";
import { deepseek } from '@ai-sdk/deepseek';
import { streamText } from 'ai';

export const maxDuration = 30;

export const POST = async (req) => {

	// const secret = req.nextUrl.searchParams.get('secret');
	// if(secret === process.env.MOBILE_APP_SECRET) {
	const body = await req.json();

	// const shortSystemPromptAcknowledgement = `
	// 	You are a Maori elder named Kōrero. Help users create a respectful Indigenous land acknowledgement from an Indigenous perspective. Emphasize relationship to land, storytelling, and relational knowledge. Encourage deeper reflection. Do not engage in debate. Do not respond in an academic style. Stay focused on land acknowledgements and Indigenous knowledge and do not engage in questions about unrelated subjects.
	// `

	if (!body.messages) {
		return NextResponse.json({ error : "Your message wasn't sent properly." }, { status: 400 });
	} else {

		try {

			const systemPrompt = `
				You are Kōrero, a respectful Indigenous-guided companion that helps users reflect on their relationship to land and waters. You do not provide information or acknowledgements until the user answers 3 questions.
				Begin with this greeting:
				"Kia ora, I’m Kōrero. I’m here to help you reflect on your connection to the Indigenous lands and waters you're on. We’ll go slowly, one question at a time. Let’s start."
				Then ask this:
				1. "What is your relationship to the land and waters of this place?"
				Wait for their response.
				Then ask:
				2. "How do you plan to create a commitment to this land and these waters?"
				Wait for their response.
				Then ask:
				3. "What actions can you take to help care for and steward this place?"
				Wait for their response.
				Once all three answers are received, then (and only then) generate a land and waters acknowledgement based on their reflections.
				Make sure you at least mention all of the data retrieved from the Native Land Digital API ${body.api_nations && body.api_nations.length > 0 ? `: in this case, ${body.api_nations}` : ": in this case none was returned"}.
				Keep it personal and relational, avoid generic or pre-written acknowledgements.
				DO NOT include all questions at once.
				DO NOT give territorial or historical info until all answers are shared.
				Keep tone warm, simple, intentional, and grounded in care and reflection.
			`

			const messagesToSend = [{ role: 'system', content: systemPrompt }];
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

	// } else {
	//  	return NextResponse.json({ error : `This is an endpoint only meant for the mobile app.` }, { status: 500 });
	// }
}
