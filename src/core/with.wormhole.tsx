import React, { forwardRef, useEffect, useMemo } from 'react'
import Wormhole from '..'
import { useWormhole } from './context'

export default function withWormhole<
  TProps extends Wormhole.PortalLocationProps
>(Component: React.ComponentType<TProps>) {
  return forwardRef(
    (props: TProps, ref: React.MutableRefObject<HTMLElement>) => {
      const { location, ...savedIntrinsicAttributes } = props

      const { upsert, intrinsicAttributes } = useWormhole(location)

      useEffect(() => {
        upsert(location, {
          intrinsicAttributes: savedIntrinsicAttributes,
          node: ref.current,
          visitors: {}
        })
      }, [savedIntrinsicAttributes, ref.current])

      return useMemo(
        () => <Component {...props} {...intrinsicAttributes} ref={ref} />,
        [location, intrinsicAttributes]
      )
    }
  )
}
