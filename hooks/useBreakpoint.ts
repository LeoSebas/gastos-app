import {Dispatch, SetStateAction, useEffect, useState} from "react";

const breakpoints = {
    0: 'xs',
    640: 'sm',
    768: 'md',
    1024: 'lg',
    1280: 'xl',
    1536: '2xl',
    1920: '3xl'
}

const useBreakpoint = () => {

    interface WindowsSize {
        width: number,
        height: number
    }

    const [breakpoint, setBreakpoint] = useState('')
    const [windowsSize, setWindowsSize]: [WindowsSize, Dispatch<SetStateAction<WindowsSize>>] = useState({
            width: undefined,
            height: undefined
        }
    )

    /// Handler para cambiar los valores de ancho  y alto de la pantalla.
    const handleResize = () => {
        setWindowsSize({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize()

        if (0 < windowsSize.width && windowsSize.width < 640) {
            setBreakpoint(breakpoints[0])
        }
        if (640 <= windowsSize.width && windowsSize.width < 768) {
            setBreakpoint(breakpoints[640])
        }
        if (768 <= windowsSize.width && windowsSize.width < 1024) {
            setBreakpoint(breakpoints[768])
        }
        if (1024 <= windowsSize.width && windowsSize.width < 1280) {
            setBreakpoint(breakpoints[1024])
        }
        if (1280 <= windowsSize.width && windowsSize.width < 1536) {
            setBreakpoint(breakpoints[1280])
        }
        if (1536 <= windowsSize.width && windowsSize.width < 1920) {
            setBreakpoint(breakpoints[1536])
        }
        if (windowsSize.width >= 1920) {
            setBreakpoint(breakpoints[1920])
        }

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [windowsSize.width])

    return {breakpoint, windowsSize}
}

export default useBreakpoint