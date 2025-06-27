import { db } from '@/lib/db/kysely'
import { headers } from 'next/headers'
import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';
import lunr from 'lunr';

import { searchableFiles } from '@/root/generate-search-index';

export const GET = async (req) => {
  const referer = headers().get('referer');
  if(referer && referer.indexOf(process.env.NEXTAUTH_URL) > -1) {

    try {

      // const page = req.nextUrl.searchParams.get('page');
      const search = req.nextUrl.searchParams.get('s');

      let totalQuery = db.selectFrom('Entry')
        .where('published', '=', true)
        .select((eb) => eb.fn.count('id').as('num_entries'))

      let query = db.selectFrom('Entry')
        .where('published', '=', true)
        .select(['Entry.id', 'Entry.name', 'Entry.slug', 'Entry.category'])
        // .limit(24)
        // .offset(24 * page)

      if(search) {
        query = query.where((eb) => eb.or([
          eb(eb.fn('lower', 'Entry.name'), 'like', `%${search.toLowerCase()}%`),
          eb(eb.fn('lower', 'Entry.slug'), 'like', `%${search.toLowerCase()}%`),
        ]));
        totalQuery = totalQuery.where((eb) => eb.or([
          eb(eb.fn('lower', 'Entry.name'), 'like', `%${search.toLowerCase()}%`),
          eb(eb.fn('lower', 'Entry.slug'), 'like', `%${search.toLowerCase()}%`),
        ]));
      }

      let entries = [];
      let totalEntries = 0;
      if(search) {
        entries = await query.execute()
        totalEntries = await totalQuery.execute()
      }

      let pageResults = [];
      if(search) {
        const filePath = path.join(process.cwd(), 'public/search-index.json');
        const indexJson = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const idx = lunr.Index.load(indexJson);
        const searchResults = idx.search(search);
        searchResults.forEach(result => {
          result.page = searchableFiles.find(file => file.path.indexOf(result.ref) > -1);
        })
        pageResults = searchResults;
      }

      let totalResults = 0;
      if(search) {
        let entryResults = Number(totalEntries[0].num_entries)
        totalResults = entryResults + pageResults.length;
      }

      if(totalResults > 0) {
        return NextResponse.json({
          entries : entries,
          pages : pageResults,
          totalResults : totalResults
        });
      } else {
        return NextResponse.json({ error : `No results found`, entries : [], pages : [], totalResults: 0 }, { status: 400 });
      }

    } catch (error) {
      console.error(error);
      return NextResponse.json({ error : `Something went wrong. Here is the error message: ${JSON.stringify(error)}` }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error : `This is a endpoint restricted to Native Land only` }, { status: 500 });
  }
}
