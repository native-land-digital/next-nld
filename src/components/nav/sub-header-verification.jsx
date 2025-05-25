"use client"
import { useState } from 'react';
import { useTranslations } from '@/i18n/client-i18n';
import { Popover } from 'react-tiny-popover'

export default function SubHeaderVerification({ verification }) {

    const t = useTranslations('Dashboard');
    const [ popoverOpen, setPopoverOpen ] = useState(false);

    if(!verification || !verification.verified) {
        return false;
    }

    return (
        <Popover
            isOpen={popoverOpen}
            positions={['right']}
            content={
                <div className="ml-2 bg-white/75 px-2.5 py-1 rounded-lg shadow-lg text-black text-sm">
                    {verification.details && verification.details !== "" ? 
                        <span>{t('verified')}: {verification.details} ({new Date(verification.updatedAt).toLocaleDateString('en-US', { year: "numeric", month: "long", day: "numeric",})})</span>
                    :
                        <span>{t('verified')}: {new Date(verification.updatedAt).toLocaleDateString('en-US', { year: "numeric", month: "long", day: "numeric",})}</span>
                    }
                </div>
            }
        >
        <svg onMouseEnter={() => setPopoverOpen(true)} onMouseLeave={() => setPopoverOpen(false)} className="inline ml-2 cursor-pointer" fill="#50C878" width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g data-name="Layer 2">
                <g data-name="checkmark-circle-2">
                <rect width="24" height="24" opacity="0"/>
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm4.3 7.61l-4.57 6a1 1 0 0 1-.79.39 1 1 0 0 1-.79-.38l-2.44-3.11a1 1 0 0 1 1.58-1.23l1.63 2.08 3.78-5a1 1 0 1 1 1.6 1.22z"/>
                </g>
            </g>
        </svg>
    </Popover>
    );
}
