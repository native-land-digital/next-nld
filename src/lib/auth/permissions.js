export const possiblePermissions = [
  'profile',
  'api',
  'research',
  'update_mapbox',
  'manage_users'
]

export const editableColumns = {
  research : [
    "name",
    "color",
    "sources",
    "pronunciation",
    "category",
    "published",
    "media",
    "websites",
    "greetings",
    "relatedTo",
    "geometry"
  ],
  users : [
    "email",
    "name",
    "organization"
  ]
}

export const hasResearchPermission = (permissions) => {
  let researchPermissions = false;
  if(permissions) {
    permissions.forEach(permission => {
      if(permission.indexOf('research') > -1) {
        researchPermissions = true;
      }
    })
  }
  return researchPermissions;
}

export const allowedResearchIDs = (permissions) => {
  let allowedIDs = [];
  if(permissions) {
    permissions.forEach(permission => {
      if(permission.indexOf('research') > -1) {
        if(permission !== 'research') {
          let thisID = permission.replace('research_', '');
          if(thisID && thisID !== "") {
            allowedIDs.push(parseInt(thisID));
          }
        }
      }
    })
  }
  return allowedIDs;
}
