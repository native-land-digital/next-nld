import { redirect } from 'next/navigation'
import { NextResponse } from "next/server";

export const GET = async (req, route) => {
  const { category: category } = route.params;
	// const key = req.nextUrl.searchParams.get('key');

  if(category) {
    if(category === 'territories') {
      redirect('https://d2u5ssx9zi93qh.cloudfront.net/territories.geojson')
    } else if (category === 'languages') {
      redirect('https://d2u5ssx9zi93qh.cloudfront.net/languages.geojson')
    } else if (category === 'treaties') {
      redirect('https://d2u5ssx9zi93qh.cloudfront.net/treaties.geojson')
    } else {
      return NextResponse.json({ error : `Your category was not one of territories, languages, or treaties` }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error : `You need to include a category` }, { status: 500 });
  }
}
