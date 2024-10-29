export const GET = async (req) => {
  const token = await getToken({ req })

  if(token && token.id) {

    const user = await db.selectFrom('User')
      .where('id', '=', Number(token.id))
      .select(['permissions'])
      .executeTakeFirst()

    if(user.permissions.includes('issues')) {
  		const { id: issueId } = route.params;

      try {

        let issue = db.selectFrom('Issue')
          .where('id', '=', issueId)
          .select([
            'id', 'name', 'category'
          ])
          .distinctOn('id')
          .orderBy('createdAt')
          .execute();

        return NextResponse.json(issue);

      } catch (error) {
        console.error(error);
        return NextResponse.json({ error : `Something went wrong. Here is the error message: ${JSON.stringify(error)}` }, { status: 500 });
      }
    } else {
      return NextResponse.json({ error : `You do not have permission to access this endpoint` }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error : `You do not have permission to access this endpoint` }, { status: 500 });
  }

}

export const DELETE = async (req, route) => {
  const token = await getToken({ req })

	if(token && token.id) {

    const user = await db.selectFrom('User')
      .where('id', '=', Number(token.id))
      .select(['permissions'])
      .executeTakeFirst()

		if(user.permissions.includes('issues')) {
  		const { id: issueId } = route.params;

  		try {

        const issue = await db.deleteFrom('Issue')
          .where('id', '=', Number(issueId))
          .execute();

  			return NextResponse.json({ issue });

  		} catch (error) {
  			console.error(error);

  			return NextResponse.json({ error : "Something went wrong deleting the comment" }, { status: 500 });
  		}
  	} else {
      return NextResponse.json({ error : `You do not have permission to access this endpoint` }, { status: 500 });
  	}
	} else {
    return NextResponse.json({ error : `You do not have permission to access this endpoint` }, { status: 500 });
	}
}
