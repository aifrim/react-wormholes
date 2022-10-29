import React from 'react'
import Wormhole from '.'

describe('Wormhole', () => {
  it('is truthy', () => {
    expect(Wormhole).toBeTruthy()
  })

  it('provides', () => {
    const TestComponent = () => {
      return (
        <Wormhole.Provider>
          <Wormhole.PortalLocation location='location' />

          <Wormhole.Portal location='location'>
            <div>Teleported</div>
          </Wormhole.Portal>
        </Wormhole.Provider>
      )
    }

    expect(TestComponent).toBeTruthy()
  })
})
