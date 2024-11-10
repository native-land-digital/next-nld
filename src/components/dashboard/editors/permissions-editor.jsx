'use client'
import { useState, useEffect } from 'react';
import { useTranslations } from '@/i18n/client-i18n';
import AsyncSelect from 'react-select/async';

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
      setEntityTab(permissionEntities[0])
      setActionTab(permissionActions[0])
    }
  }, [permissionActions])

  useEffect(() => {
    if(entityTab && actionTab) {
      const newCurrentGlobalPermissions = globalPermissions.find(perm => perm.entityId === entityTab.id && perm.actionId === actionTab.id);
      const newCurrentItemPermissions = itemPermissions.filter(perm => perm.entityId === entityTab.id && perm.actionId === actionTab.id);
      setCurrentGlobalPermissions(newCurrentGlobalPermissions)
      setCurrentItemPermissions(newCurrentItemPermissions)
      setCurrentPermissionColumns(editableColumns[entityTab.name] ? editableColumns[entityTab.name] : [])
    }
  }, [entityTab, actionTab, globalPermissions, itemPermissions])

  const modifyGlobalPermissions = (columnName, value) => {
    const permissionsCopy = JSON.parse(JSON.stringify(globalPermissions));
    const thisEntityIndex = permissionsCopy.findIndex(perm => perm.entityId === entityTab.id && perm.actionId === actionTab.id)
    // If adding "all" permissions and nothing exists
    if(thisEntityIndex === -1 && columnName === null && value === true) {
      permissionsCopy.push({ actionId : actionTab.id, entityId : entityTab.id, columnNames : null });
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
        let columnNameIndex = permissionsCopy[thisEntityIndex].columnNames.indexOf(columnName)
        permissionsCopy[thisEntityIndex].columnNames.splice(columnNameIndex, 1);
        if(permissionsCopy[thisEntityIndex].columnNames.length === 0) {
          permissionsCopy.splice(thisEntityIndex, 1);
        }
      }
      // Adding totally new scoped value
      if(thisEntityIndex === -1 && value === true) {
        permissionsCopy.push({ actionId : actionTab.id, entityId : entityTab.id, columnNames : [columnName] })
      }
    }
    setGlobalPermissions(permissionsCopy)
  }

  const modifyItemPermissions = (entryId, columnName, value) => {
    const permissionsCopy = JSON.parse(JSON.stringify(itemPermissions));
    const thisItemIndex = permissionsCopy.findIndex(perm => perm.entityId === entityTab.id && perm.actionId === actionTab.id && perm.entryId === entryId)
    // If adding "all" permissions and something exists
    if(columnName === null && value === true) {
      permissionsCopy[thisItemIndex].columnNames = null;
    }
    if(columnName === null && value === false) {
      permissionsCopy[thisItemIndex].columnNames = [];
    }
    // If changing column values
    if(columnName !== null) {
      // Adding to existing scoped value
      if(value === true) {
        permissionsCopy[thisItemIndex].columnNames.push(columnName)
      }
      // Removing existing scoped value
      if(value === false) {
        let columnNameIndex = permissionsCopy[thisItemIndex].columnNames.indexOf(columnName)
        permissionsCopy[thisItemIndex].columnNames.splice(columnNameIndex, 1);
        if(permissionsCopy[thisItemIndex].columnNames.length === 0) {
          permissionsCopy.splice(thisItemIndex, 1);
        }
      }
    }
    setItemPermissions(permissionsCopy)
  }

  const removeItemPermission = (entryId) => {
    const permissionsCopy = JSON.parse(JSON.stringify(itemPermissions));
    const thisItemIndex = permissionsCopy.findIndex(perm => perm.entityId === entityTab.id && perm.actionId === actionTab.id && perm.entryId === entryId)
    permissionsCopy.splice(thisItemIndex, 1);
    setItemPermissions(permissionsCopy)
  }

  const addEntryPermission = (entry) => {
    const permissionsCopy = JSON.parse(JSON.stringify(itemPermissions));
    const thisPerm = permissionsCopy.find(perm => perm.entityId === entityTab.id && perm.actionId === actionTab.id && perm.entryId === entry.value)
    if(!thisPerm) {
      permissionsCopy.push({ actionId : actionTab.id, entityId : entityTab.id, userId : null, entryId : entry.value, entryName : entry.label, columnNames : null })
      setItemPermissions(permissionsCopy)
    }
  }

  const loadEntryOptions = (inputValue, callback) => {
    if(inputValue.length >= 3) {
      fetch(`/api/search?s=${inputValue}&type=entries`).then(resp => resp.json()).then(response => {
        if(response.length > 0) {
          callback(response.map(entry => {
            return {
              value : entry.id,
              label : `${entry.name} (${entry.category})`
            }
          }));
        }
      })
    }
  };

  return (
    <div className="mt-2.5">
      <label className="text-gray-800 text-sm mb-1 block">{t('permissions')}</label>
      <div className="relative">
        <p className="text-gray-500 text-xs mb-2.5">{t('permissions-log-out')}</p>

        <div className="flex bg-slate-100 rounded shadow border">
          {permissionEntities.map((entity, i) => {
            return (
              <div key={`${entity.id}-${i}`}>
                <div className={`${entityTab.id === entity.id ? 'bg-white' : ''} p-2.5 uppercase text-xs cursor-pointer`} onClick={() => setEntityTab(entity)}>
                  <p>{entity.name}</p>
                </div>
              </div>
            )
          })}
        </div>
        <div className="flex">
          {permissionActions.map((action, i) => {
            return (
              <div key={`${action.id}-${i}`} className={`${actionTab.id === action.id ? 'bg-white' : 'bg-slate-100'} mr-1 rounded-b p-1 uppercase text-xs cursor-pointer border-b border-l border-r border-slate-300`} onClick={() => setActionTab(action)}>
                <p>{action.name}</p>
              </div>
            )
          })}
        </div>
        <div className="mt-2.5">
          <p className="text-sm">Global Permissions</p>
          <input id={`all-${entityTab.id}`} type="checkbox" onChange={(e) => modifyGlobalPermissions(null, e.target.checked)} checked={currentGlobalPermissions?.columnNames === null ? true : false} /> <label htmlFor={`all-${entityTab.id}`} className="uppercase text-xs">All</label>
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
        {entityTab.name === 'research' ?
          <div className="mt-2.5">
            <p className="text-sm">Per-Entry Permissions</p>
            <p className="text-xs">Add New</p>
            <AsyncSelect
              instanceId="entry-select"
              placeholder={t('search-entries')}
              onChange={(e) => addEntryPermission(e)}
              cacheOptions
              loadOptions={loadEntryOptions} />
              {currentItemPermissions.map((item, i) => {
                return (
                  <div className="mt-2.5" key={`item-entry-${i}`}>
                    <p className="text-xs">{item.entryName} - <span className="cursor-pointer text-blue-600" onClick={() => removeItemPermission(item.entryId)}>Remove</span></p>
                    <input id={`all-${entityTab.id}-${item.entryId}`} type="checkbox" onChange={(e) => modifyItemPermissions(item.entryId, null, e.target.checked)} checked={item.columnNames === null ? true : false} /> <label htmlFor={`all-${entityTab.id}-${item.entryId}`} className="uppercase text-xs">All</label>
                    {currentPermissionColumns.map((columnName, i) => {
                      return (
                        <div key={`columnname-${item.entryId}-${i}`}>
                          <input id={`columnname-${item.entryId}-${i}`} type="checkbox" onChange={(e) => modifyItemPermissions(item.entryId, columnName, e.target.checked)} checked={item.columnNames === null || item.columnNames?.indexOf(columnName) > -1 ? true : false} /> <label htmlFor={`columnname-${item.entryId}-${i}`} className="uppercase text-xs">{columnName}</label>
                        </div>
                      )
                    })}
                  </div>
                )
              })}
          </div>
        : false}
      </div>
    </div>
  )
}
