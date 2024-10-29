export const DELETE = async (req, route) => {
  const token = await getToken({ req })

	if(token && token.id) {

    const user = await db.selectFrom('User')
      .where('id', '=', Number(token.id))
      .select(['permissions'])
      .executeTakeFirst()

		if(user.permissions.includes('issues')) {
  		const { id: commentId } = route.params;

  		try {

        const issueComment = await db.deleteFrom('IssueComment')
          .where('id', '=', Number(commentId))
          .execute();

  			return NextResponse.json({ issueComment });
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
