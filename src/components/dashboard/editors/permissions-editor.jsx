'use client'
import { useState, useEffect } from 'react';
import { useTranslations } from '@/i18n/client-i18n';

import { editableColumns } from '@/lib/auth/permissions'

export default function PermissionsEditor({ globalPermissions, setGlobalPermissions, itemPermissions, setItemPermissions, permissionActions, permissionEntities }) {

  const t = useTranslations('Dashboard');

  const [ entityTab, setEntityTab ] = useState(false);
  const [ actionTab, setActionTab ] = useState(false);
  const [ currentGlobalPermissions, setCurrentGlobalPermissions ] = useState(false)
  const [ currentItemPermissions, setCurrentItemPermissions ] = useState([])
  const [ currentPermissionColumns, setCurrentPermissionColumns ] = useState([])

  useEffect(() => {
    if(permissionActions && permissionEntities) {
      setEntityTab(permissionEntities[0].name)
      setActionTab(permissionActions[0].name)
    }
  }, [permissionActions])

  useEffect(() => {
    if(entityTab && actionTab) {
      const newCurrentGlobalPermissions = globalPermissions.find(perm => perm.entity === entityTab && perm.action === actionTab);
      const newCurrentItemPermissions = itemPermissions.filter(perm => perm.entity === entityTab && perm.action === actionTab);
      setCurrentGlobalPermissions(newCurrentGlobalPermissions)
      setCurrentItemPermissions(newCurrentItemPermissions)
      setCurrentPermissionColumns(editableColumns[entityTab] ? editableColumns[entityTab] : [])
    }
  }, [entityTab, actionTab, globalPermissions, itemPermissions])

  const modifyGlobalPermissions = (columnName, value) => {
    const permissionsCopy = JSON.parse(JSON.stringify(globalPermissions));
    const thisEntityIndex = permissionsCopy.findIndex(perm => perm.entity === entityTab && perm.action === actionTab)
    // If adding "all" permissions and nothing exists
    if(thisEntityIndex === -1 && columnName === null && value === true) {
      permissionsCopy.push({ action : actionTab, entity : entityTab, columnNames : null });
    }
    // If adding "all" permissions and something exists
    if(thisEntityIndex > -1 && columnName === null && value === true) {
      permissionsCopy[thisEntityIndex].columnNames = null;
    }
    // If removing "all" permissions
    if(thisEntityIndex > -1 && columnName === null && value === false) {
      permissionsCopy.splice(thisEntityIndex, 1);
    }
    // If changing column values
    if(columnName !== null) {
      // Adding to existing scoped value
      if(thisEntityIndex > -1 && value === true) {
        permissionsCopy[thisEntityIndex].columnNames.push(columnName)
      }
      // Removing existing scoped value
      if(thisEntityIndex > -1 && value === false) {
        let columnNameIndex = permissionsCopy[thisColumnNamesIndex].columnNames.indexOf(columnName)
        permissionsCopy[thisEntityIndex].columnNames.splice(columnNameIndex, 1);
      }
      // Adding totally new scoped value
      if(thisEntityIndex === -1 && value === true) {
        permissionsCopy.push({ action : actionTab, entity : entityTab, columnNames : [columnName] })
      }
    }
    setGlobalPermissions(permissionsCopy)
  }

  return (
    <div className="mt-2.5">
      <label className="text-gray-800 text-sm mb-1 block">{t('permissions')}</label>
      <div className="relative">
        <p className="text-gray-500 text-xs mb-2.5">{t('permissions-log-out')}</p>

        <div className="flex bg-slate-100 rounded shadow border">
          {permissionEntities.map((entity, i) => {
            return (
              <div key={`${entity}-${i}`}>
                <div className={`${entityTab === entity.name ? 'bg-white' : ''} p-2.5 uppercase text-xs cursor-pointer`} onClick={() => setEntityTab(entity.name)}>
                  <p>{entity.name}</p>
                </div>
              </div>
            )
          })}
        </div>
        <div className="flex">
          {permissionActions.map((action, i) => {
            return (
              <div key={`${action}-${i}`} className={`${actionTab === action.name ? 'bg-white' : 'bg-slate-100'} mr-1 rounded-b p-1 uppercase text-xs cursor-pointer border-b border-l border-r border-slate-300`} onClick={() => setActionTab(action.name)}>
                <p>{action.name}</p>
              </div>
            )
          })}
        </div>
        <div className="mt-2.5">
          <p className="text-sm">Global Permissions</p>
          <input id={`all-${entityTab}`} type="checkbox" onChange={(e) => modifyGlobalPermissions(null, e.target.checked)} checked={currentGlobalPermissions?.columnNames === null ? true : false} /> <label htmlFor={`all-${entityTab}`} className="uppercase text-xs">All</label>
          <div>
            {currentPermissionColumns.map((columnName, i) => {
              return (
                <div key={`columnname-${i}`}>
                  <input id={`columnname-${i}`} type="checkbox" onChange={(e) => modifyGlobalPermissions(columnName, e.target.checked)} checked={currentGlobalPermissions?.columnNames === null || currentGlobalPermissions?.columnNames?.indexOf(columnName) > -1 ? true : false} /> <label htmlFor={`columnname-${i}`} className="uppercase text-xs">{columnName}</label>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
