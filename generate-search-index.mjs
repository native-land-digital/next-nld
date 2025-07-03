import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import lunr from 'lunr';

export const searchableFiles = [{
  name : "FAQ",
  path : 'about/faq/en.mdx'
},{
  name : "How It Works",
  path : 'about/how-it-works/en.mdx'
},{
  name : "Partners & Contributors",
  path : 'about/partners-and-contributors/en.mdx'
},{
  name : "Roadmap",
  path : 'about/roadmap/en.mdx'
},{
  name : "Why It Matters",
  path : 'about/why-it-matters/en.mdx'
},{
  name : "Contact",
  path : 'contact/en.mdx'
},{
  name : "Fixes & Adding Maps",
  path : 'how-to-contribute/fixes-and-adding-maps/en.mdx'
},{
  name : "Jobs",
  path : 'how-to-contribute/jobs/en.mdx'
},{
  name : "Translations",
  path : 'how-to-contribute/translations/en.mdx'
},{
  name : "Media Coverage",
  path : 'media/media-coverage/en.mdx'
},{
  name : "Mobile Apps",
  path : 'resources/mobile-apps/en.mdx'
},{
  name : "Teacher's Guide",
  path : 'resources/teachers-guide/en.mdx'
},{
  name : "Territory Acknowledgement",
  path : 'resources/territory-acknowledgement/en.mdx'
},{
  name : "Supporter's Circle",
  path : 'support/supporters-circle/en.mdx'
},{
  name : "Support",
  path : 'support/en.mdx'
}];

const contentDir = path.join(process.cwd(), 'src/app/[locale]/(public)'); // adjust as needed

const docs = searchableFiles.map((file) => {
  const fullPath = path.join(contentDir, file.path);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  return {
    title: file.name,
    slug: file.path.replace(/\en.mdx?$/, ''),
    content,
  };
});

const index = lunr(function () {
  this.ref('slug');
  this.field('title');
  this.field('content');
  docs.forEach((doc) => this.add(doc));
});

fs.writeFileSync('public/search-index.json', JSON.stringify(index));

console.log("Generated search index.")