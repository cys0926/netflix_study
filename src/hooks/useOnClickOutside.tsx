// import { Ref, RefObject, useEffect } from 'react'
// import { Handler } from 'arg'
//
// export default function useOnClickOutside<T extends HTMLElement = HTMLElement>(
//     ref: RefObject<T>,
//     handler: Handler
// ) {
//     useEffect(() => {
//         const listener = (event: MouseEvent) => {
//             if (!ref.current || ref.current.contains(event.target as Node)) {
//                 return
//             }
//
//             handler(event)
//         }
//         document.addEventListener('mousedown', listener)
//         document.addEventListener('touchstart', listener)
//         return () => {
//             document.removeEventListener('mousedown', listener)
//             document.removeEventListener('touchstart', listener)
//         }
//     }, [ref, handler])
// }

import { RefObject } from 'react'
import useEventListener from './useEventListener'

type Handler = (event: MouseEvent) => void

function useOnClickOutside<T extends HTMLElement = HTMLElement>(
    ref: RefObject<T>,
    handler: Handler,
    mouseEvent: 'mousedown' | 'mouseup' = 'mousedown'
): void {
    useEventListener(mouseEvent, (event) => {
        const el = ref?.current

        // Do nothing if clicking ref's element or descendent elements
        if (!el || el.contains(event.target as Node)) {
            return
        }

        handler(event)
    })
}

export default useOnClickOutside
