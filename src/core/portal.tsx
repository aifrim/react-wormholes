import ReactDOM from 'react-dom'
import Wormhole from '..'
import withWormholeLocation from './with.wormhole.location'

function Portal({ node, children }: Wormhole.PortalProps) {
  return ReactDOM.createPortal(children, node)
}

export default withWormholeLocation(Portal)
