import Link from 'next/link'

import SubHeader from '@/components/nav/sub-header'

export default function NotFound() {
  return (
    <div>
      <div className="font-[sans-serif] bg-white pb-5">
        <SubHeader title={"404 Not Found"} />
      </div>
    </div>
  )
}
