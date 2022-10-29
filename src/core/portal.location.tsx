import React, { forwardRef } from 'react'
import Wormhole from '..'
import withWormhole from './with.wormhole'

function PortalLocation(
  { location, ...intrinsicAttributes }: Wormhole.PortalLocationProps,
  ref: React.MutableRefObject<HTMLDivElement>
) {
  return (
    <div id={`wormhole-${location}`} ref={ref} {...intrinsicAttributes}></div>
  )
}

export default withWormhole(forwardRef(PortalLocation))
