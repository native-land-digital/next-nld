'use client'
import { useTranslations } from '@/i18n/client-i18n';

import { editableColumns } from '@/lib/auth/permissions'

export default function PermissionsEditor({ globalPermissions, setGlobalPermissions, itemPermissions, setItemPermissions, permissionActions, permissionEntities }) {

  const t = useTranslations('Dashboard');

  console.log(globalPermissions)

  return (
    <div className="mt-2.5">
      <label className="text-gray-800 text-sm mb-1 block">{t('permissions')}</label>
      <div className="relative">
        <p className="text-gray-500 text-xs mb-2.5">{t('permissions-log-out')}</p>
        {permissionEntities.map((entity, i) => {
          const thisGlobalPermission = globalPermissions.find(perm => perm.entity === entity.name);
          const columnNames = editableColumns[entity.name];
          return (
            <div key={`checkbox-${i}`} className="mt-2.5">
              <p className="uppercase text-sm font-bold">{entity.name}</p>
              <p className="text-sm">Global</p>
              {permissionActions.map((action, ii) => {
                if(columnNames) {
                  return (
                    <div>
                      {columnNames.map((columnName, iii) => {
                        return (
                          <div key={`${i}-${ii}-${iii}-name`}>
                            <input id={`${i}-${ii}-action`} type="checkbox" checked={typeof thisGlobalPermission !== 'undefined' ? true : false} /> <label for={`${i}-${ii}-action`} className="uppercase text-xs">{columnName}</label>
                          </div>
                        )
                      })}
                    </div>
                  )
                } else {
                  return (
                    <div key={`${i}-${ii}-action`}>
                      <input id={`${i}-${ii}-action`} type="checkbox" checked={typeof thisGlobalPermission !== 'undefined' ? true : false} /> <label for={`${i}-${ii}-action`} className="uppercase text-xs">{action.name}</label>
                    </div>
                  )
                }
              })}
              {columnNames ?
                <div>
                  <p className="text-sm">Item</p>
                  {entity.name === 'research' ?
                    <div>
                      <input type="text" placeholders="Search entries" />
                    </div>
                  : false}
                  {entity.name === 'users' ?
                    <div>
                      <input type="text" placeholders="Search users" />
                    </div>
                  : false}
                </div>
              : false}
            </div>
          )
        })}
      </div>
    </div>
  )
}
