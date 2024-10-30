export const possiblePermissions = [
  'profile',
  'api',
  'research',
  'update_mapbox',
  'issues',
  'manage_users'
]

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
