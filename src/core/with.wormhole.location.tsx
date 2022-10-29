import React, { forwardRef, useEffect, useMemo, useRef } from 'react'
import Wormhole from '..'
import { useWormholeLocation } from './context'

export default function withWormholeLocation<
  TProps extends Omit<Wormhole.PortalProps, 'node'>
>(Component: React.ComponentType<TProps>) {
  return forwardRef(
    (props: Omit<TProps, 'node'>, ref: React.MutableRefObject<HTMLElement>) => {
      const { location, ...intrinsicAttributes } = props

      const idRef = useRef<string>()
      const { node, enter, exit } = useWormholeLocation(location)

      const componentProps = {
        ...props,
        node
      } as unknown as TProps

      useEffect(() => {
        idRef.current = enter(location, intrinsicAttributes)

        return () => {
          idRef.current && exit(location, idRef.current)
        }
      }, [location])

      useEffect(() => {
        enter(location, intrinsicAttributes, idRef.current)
      }, [props])

      return useMemo(
        () => (node ? <Component {...componentProps} ref={ref} /> : null),
        [node]
      )
    }
  )
}
