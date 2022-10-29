import { PropsWithChildren } from 'react'
import { WormholeProvider as Provider } from './core/context'
import PortalLocation from './core/portal.location'
import Portal from './core/portal'

declare namespace Wormhole {
  type Element = 'div'

  export type Locations = string

  export type PortalLocationIntrinsicElement = Omit<
    JSX.IntrinsicElements[Element],
    'id'
  >

  export type PortalLocationProps = PortalLocationIntrinsicElement & {
    location: Locations
  }

  export type PortalIntrinsicElement = Pick<
    JSX.IntrinsicElements[Element],
    'style' | 'className'
  >

  export type PortalProps = PortalIntrinsicElement &
    PropsWithChildren<{
      location: Locations
      node: HTMLElement
    }>

  export type PortalLocation = {
    intrinsicAttributes: PortalLocationIntrinsicElement
    visitors: Record<string, PortalIntrinsicElement>

    node: HTMLElement
  }

  export type PortalsRecord = Record<Locations, PortalLocation>

  export type Context = {
    portals: PortalsRecord
    upsert: (
      location: Wormhole.Locations,
      portal: Wormhole.PortalLocation
    ) => void
    remove: (location: Wormhole.Locations) => void
    enter: (
      location: Wormhole.Locations,
      intrinsicAttributes: PortalIntrinsicElement,
      id?: string
    ) => string
    exit: (location: Wormhole.Locations, id: string) => void
  }
}

const Wormhole = {
  Provider,
  PortalLocation,
  Portal
}

export default Wormhole
