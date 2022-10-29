import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState
} from 'react'
import Wormhole from '..'

const noop = () => {
  return 0 as unknown as any
}

const WormholeContext = createContext<Wormhole.Context>({
  portals: {},
  upsert: noop,
  remove: noop,
  enter: noop,
  exit: noop
})

export function WormholeProvider({ children }: PropsWithChildren<{}>) {
  const [portals, setPortals] = useState<Wormhole.PortalsRecord>({})

  const portalsRef = useRef(portals)
  portalsRef.current = portals

  const upsert = useCallback(
    (location: Wormhole.Locations, portal: Wormhole.PortalLocation) => {
      setPortals((ps) => {
        return { ...ps, [location]: portal }
      })
    },
    []
  )

  const remove = useCallback(() => {
    setPortals((ps) => ({ ...ps }))
  }, [])

  const enter = useCallback(
    (
      location: Wormhole.Locations,
      intrinsicAttributes: Wormhole.PortalIntrinsicElement,
      id = crypto.randomUUID()
    ) => {
      setPortals((ps) => {
        return {
          ...ps,
          [location]: {
            ...ps[location],
            visitors: {
              ...ps[location].visitors,
              [id]: { ...intrinsicAttributes }
            }
          }
        }
      })

      return id
    },
    []
  )

  const exit = useCallback((location: Wormhole.Locations, id: string) => {
    setPortals((ps) => {
      const nps = { ...ps }

      delete nps[location].visitors[id]

      return nps
    })
  }, [])

  return (
    <WormholeContext.Provider value={{ portals, upsert, remove, enter, exit }}>
      {children}
    </WormholeContext.Provider>
  )
}

// TODO: better memoization
export function useWormhole(location: Wormhole.Locations) {
  const ctx = useContext(WormholeContext)

  const portal = ctx.portals[location]

  const style = Object.values(portal.visitors)
    .map(({ style }) => ({ style }))
    .reduce(
      (acc, styles) => ({ ...acc, styles }),
      portal.intrinsicAttributes.style ?? {}
    )

  const className = Object.values(portal.visitors)
    .map(({ className }) => ({ className }))
    .reduce((acc, classNames) => ({ ...acc, classNames }), [])
    .join(' ')

  const intrinsicAttributes: Wormhole.PortalLocationIntrinsicElement = {
    ...portal.intrinsicAttributes,
    style,
    className
  }

  return useMemo(
    () => ({ intrinsicAttributes, upsert: ctx.upsert }),
    [intrinsicAttributes]
  )
}

export function useWormholeLocation(location: Wormhole.Locations) {
  const { portals, enter, exit } = useContext(WormholeContext)
  const node = portals[location]?.node

  return useMemo(() => ({ node, enter, exit }), [node])
}
