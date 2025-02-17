import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const GroupChat = () => {
    const [isSettings, setIsSettings] = useState<boolean>()

    return (
        <div className="border w-full h-full flex flex-col border-black dark:border-white ">
            <div className="border-black dark:border-white border-b flex items-center h-12 px-2">
                <svg xmlns="http://www.w3.org/2000/svg" className='cursor-pointer' onClick={() => setIsSettings(!isSettings)} width="28" height="28" viewBox="0 0 24 24">
                    <path fill="currentColor" 
                        d="M10.825 22q-.675 0-1.162-.45t-.588-1.1L8.85 18.8q-.325-.125-.612-.3t-.563-.375l-1.55.65q-.625.275-1.25.05t-.975-.8l-1.175-2.05q-.35-.575-.2-1.225t.675-1.075l1.325-1Q4.5 12.5 4.5 12.337v-.675q0-.162.025-.337l-1.325-1Q2.675 9.9 2.525 9.25t.2-1.225L3.9 5.975q.35-.575.975-.8t1.25.05l1.55.65q.275-.2.575-.375t.6-.3l.225-1.65q.1-.65.588-1.1T10.825 2h2.35q.675 0 1.163.45t.587 1.1l.225 1.65q.325.125.613.3t.562.375l1.55-.65q.625-.275 1.25-.05t.975.8l1.175 2.05q.35.575.2 1.225t-.675 1.075l-1.325 1q.025.175.025.338v.674q0 .163-.05.338l1.325 1q.525.425.675 1.075t-.2 1.225l-1.2 2.05q-.35.575-.975.8t-1.25-.05l-1.5-.65q-.275.2-.575.375t-.6.3l-.225 1.65q-.1.65-.587 1.1t-1.163.45zm1.225-6.5q1.45 0 2.475-1.025T15.55 12t-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12t1.013 2.475T12.05 15.5"/>
                </svg>
                
            </div>

            <div className="flex-grow ">

                <AnimatePresence>
                        {isSettings && (
                            <motion.div
                                initial={{ opacity: 0, x: -1 }}
                                animate={{ opacity: 1, x: 0 }} 
                                exit={{ opacity: 0, x: -1 }} 
                                transition={{ duration: 0.2 }}
                                className='h-full text-lg pl-5 pt-5 flex flex-col gap-5'
                            >
                                <div className='flex gap-5 items-center '>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
                                        <g fill="none" fillRule="evenodd">
                                            <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/>
                                            <path fill="currentColor" d="M16 14a5 5 0 0 1 5 5v2a1 1 0 1 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 1 1-2 0v-2a5 5 0 0 1 5-5zm4-6a1 1 0 0 1 1 1v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 1 1 0-2h1V9a1 1 0 0 1 1-1m-8-6a5 5 0 1 1 0 10a5 5 0 0 1 0-10m0 2a3 3 0 1 0 0 6a3 3 0 0 0 0-6"/>
                                        </g>
                                    </svg>
                                    <p>Add Member</p>
                                </div>

                                <div className='flex ml-1 gap-3 items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18.621 12.121L20.743 10m2.121-2.121L20.743 10m0 0L18.62 7.879M20.743 10l2.121 2.121M1 20v-1a7 7 0 0 1 7-7v0a7 7 0 0 1 7 7v1m-7-8a4 4 0 1 0 0-8a4 4 0 0 0 0 8"/>
                                    </svg>
                                    <p>Remove Member</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
            </div>

            <div className="h-12 flex items-center gap-4 px-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m21 17l-3.293-3.293a1 1 0 0 0-1.414 0l-.586.586a1 1 0 0 1-1.414 0l-2.879-2.879a2 2 0 0 0-2.828 0L3 17M21 5v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1m-5 3a1 1 0 1 1-2 0a1 1 0 0 1 2 0"/>
                </svg>

                <input type="text" className='w-[80%] px-3 py-1 rounded-full border-2 border-black dark:border-white' />

                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 15 16">
                    <path fill="currentColor" d="M12.49 7.14L3.44 2.27c-.76-.41-1.64.3-1.4 1.13l1.24 4.34q.075.27 0 .54l-1.24 4.34c-.24.83.64 1.54 1.4 1.13l9.05-4.87a.98.98 0 0 0 0-1.72Z"/>
                </svg>
            </div>
        </div>
    )
}

export default GroupChat

