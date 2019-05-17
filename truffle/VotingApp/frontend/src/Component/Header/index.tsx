import * as React from 'react'
import Particles from 'react-particles-js'
import './style.css'

const logo = require('./bss_logo.png')

type MainProps = {}
type MainState = {}
class Main extends React.Component<MainProps, MainState> {
  constructor(props: MainProps) {
    super(props)
  }

  render() {
    return (
      <header className="App-header">
        <Particles
          className="App-particle"
          params={{
            particles: {
              number: {
                value: 30,
                density: {
                  enable: true,
                  value_area: 1000
                }
              },
              color: {
                value: '#ffffff'
              },
              shape: {
                type: 'triangle',
                stroke: {
                  width: 0,
                  color: '#7e8184'
                },
                polygon: {
                  nb_sides: 4
                }
              },
              opacity: {
                value: 0.5,
                random: true,
                anim: {
                  enable: false,
                  speed: 1,
                  opacity_min: 0.1,
                  sync: false
                }
              },
              size: {
                value: 2,
                random: true,
                anim: {
                  enable: false,
                  speed: 40,
                  size_min: 0.1,
                  sync: false
                }
              },
              line_linked: {
                enable: true,
                distance: 200,
                color: '#7e8184',
                opacity: 0.4,
                width: 0.5
              },
              move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                  enable: false,
                  rotateX: 600,
                  rotateY: 1200
                }
              }
            }
          }}
        />
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Ethereum SmartContract</h1>
      </header>
    )
  }
}
export default Main
