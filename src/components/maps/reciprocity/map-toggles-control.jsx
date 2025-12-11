import Link from 'next/link'

import { exportMap } from '@/components/maps/map-utils';

export default function TogglesControl({ setModalOpen, map }) {

    return (
      <div>
        <div className="m-4 absolute right-0 bottom-0 mb-16 lg:mb-4 lg:top-0 z-[5] lg:z-10 pointer-events-none">
          <Link prefetch={false} className="block rounded-full border nld-border-teal-100 nld-bg-blue-800 p-2.5 cursor-pointer pointer-events-auto hover:bg-sky-800" href="/">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 17L21 12L16 7" stroke="#A0C6CD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M21 12H9" stroke="#A0C6CD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="#A0C6CD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </Link>
          <div onClick={() => setModalOpen(true)} className="mt-4 rounded-full border nld-border-teal-100 nld-bg-blue-800 p-2.5 cursor-pointer pointer-events-auto hover:bg-sky-800">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12C11 11.4477 11.4477 11 12 11Z" fill="#A0C6CD"/>
              <path d="M12.0098 7C12.5621 7 13.0098 7.44772 13.0098 8C13.0098 8.55228 12.5621 9 12.0098 9H12C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7H12.0098Z" fill="#A0C6CD"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1ZM12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z" fill="#A0C6CD"/>
            </svg>
          </div>
        </div>
        <div className="mb-48 lg:mb-4 lg:mr-16 absolute right-0 bottom-0 m-4 z-[5] lg:z-10 flex-col flex lg:flex-row gap-4 pointer-events-none">
          <div onClick={() => exportMap(map)} className="hidden lg:flex mt-4 items-center rounded-full border nld-text-teal-100 nld-border-teal-100 nld-bg-blue-800 p-2.5 cursor-pointer pointer-events-auto hover:bg-sky-800">
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.5 14C22.0523 14 22.5 14.4477 22.5 15V19C22.5 19.7957 22.1837 20.5585 21.6211 21.1211C21.0585 21.6837 20.2957 22 19.5 22H5.5C4.70435 22 3.94151 21.6837 3.37891 21.1211C2.8163 20.5585 2.5 19.7957 2.5 19V15C2.5 14.4477 2.94772 14 3.5 14C4.05228 14 4.5 14.4477 4.5 15V19L4.50488 19.0986C4.52757 19.3276 4.62883 19.5429 4.79297 19.707C4.98051 19.8946 5.23478 20 5.5 20H19.5C19.7652 20 20.0195 19.8946 20.207 19.707C20.3946 19.5195 20.5 19.2652 20.5 19V15C20.5 14.4477 20.9477 14 21.5 14Z" fill="#A0C6CD"/>
              <path d="M12.5 2C13.0523 2 13.5 2.44772 13.5 3V12.5859L16.793 9.29297C17.1835 8.90244 17.8165 8.90244 18.207 9.29297C18.5975 9.6835 18.5975 10.3165 18.207 10.707L13.207 15.707C13.1592 15.7548 13.1065 15.7976 13.0498 15.835C13.0121 15.8599 12.9727 15.8811 12.9326 15.9004C12.8862 15.9227 12.8381 15.942 12.7881 15.957C12.7752 15.9609 12.762 15.9635 12.749 15.9668C12.7306 15.9715 12.7122 15.9768 12.6934 15.9805C12.6863 15.9819 12.679 15.9822 12.6719 15.9834C12.6159 15.9931 12.5587 16 12.5 16C12.4433 16 12.3881 15.9934 12.334 15.9844C12.3236 15.9826 12.3131 15.9816 12.3027 15.9795C12.2912 15.9772 12.2799 15.9744 12.2686 15.9717C12.248 15.9668 12.2273 15.9623 12.207 15.9561C12.1584 15.9412 12.1116 15.9222 12.0664 15.9004C12.0266 15.8812 11.9877 15.8597 11.9502 15.835C11.8935 15.7976 11.8408 15.7548 11.793 15.707L6.79297 10.707C6.40244 10.3165 6.40244 9.68349 6.79297 9.29297C7.18349 8.90244 7.81651 8.90244 8.20703 9.29297L11.5 12.5859V3C11.5 2.44772 11.9477 2 12.5 2Z" fill="#A0C6CD"/>
            </svg>
            <div className="ml-2">Save</div>
          </div>
        </div>
      </div>
    )
  }
