export const getNavItems = (dict) => {
  return [{
    label : dict['about'],
    children : [{
      label : dict['our-team'],
      href : "/about/our-team",
    },{
      label : dict['why-it-matters'],
      href : "/about/why-it-matters",
    },{
      label : dict['how-it-works'],
      href : "/about/how-it-works",
    },{
      label : dict['partners-contributors'],
      href : "/about/partners-and-contributors",
    },{
      label : dict['roadmap'],
      href : "/about/roadmap",
    }]
  },{
    label : dict['media'],
    children : [{
      label : dict['community-blog'],
      href : "",
    },{
      label : dict['media-coverage'],
      href : "/media/media-coverage",
    }]
  },{
    label : dict['contribute'],
    children : [{
      label : dict['jobs'],
      href : "/how-to-contribute/jobs",
    },{
      label : dict['volunteer'],
      href : "/how-to-contribute/volunteer",
    },{
      label : dict['fixes-adding-maps'],
      href : "/how-to-contribute/fixes-and-adding-maps",
    },{
      label : dict['languages'],
      href : "/how-to-contribute/languages",
    },{
      label : dict['supporters-circle'],
      href : "/support/supporters-circle",
    }]
  },{
    label : dict['resources'],
    children : [{
      label : dict['territory-acknowledgement'],
      href : "/resources/territory-acknowledgement",
    },{
      label : dict['teachers-guide'],
      href : "/resources/teachers-guide",
    },{
      label : dict['mobile-apps'],
      href : "/resources/mobile-apps",
    },{
      label : dict['api'],
      href : "",
    },{
      label : dict['territories-list'],
      href : "/resources/territories-list",
    },{
      label : dict['languages-list'],
      href : "/resources/languages-list",
    },{
      label : dict['treaties-list'],
      href : "/resources/treaties-list",
    }]
  },{
    label : dict['contact'],
    href : "/contact"
  },{
    label : dict['language'],
    icon : (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-translate m-1" viewBox="0 0 16 16">
        <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286zm1.634-.736L5.5 3.956h-.049l-.679 2.022z"/>
        <path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm7.138 9.995q.289.451.63.846c-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6 6 0 0 1-.415-.492 2 2 0 0 1-.94.31"/>
      </svg>
    ),
    children : [{
      label : dict['english'],
      href : "/en"
    },{
      label : dict['french'],
      href : "/fr"
    },{
      label : dict['spanish'],
      href : "/es"
    }]
  }]
}
