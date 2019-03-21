import { Pipe, Client } from 'tricord/client'
import settings from '../config.json'
import React from 'react'

const pipe = Symbol()

export class Component extends React.Component {

    static Connections = {}

    static addConnection = async ({ url }) => {
        const client = new Client(url)
        await client.ready
        Object.assign(Component.Connections, client.Types)
    }

    constructor(...args){
      super(...args)
      const { componentDidMount, componentWillUnmount, connect } = this
      this.componentDidMount = function(){
        if(typeof connect == 'function'){ 
            this[pipe] = new Pipe(connect.bind(this, Component.Connections))
            this[pipe].observe( newState => {
                if(!this.state.users[0] || parseInt(this.state.users[0].lastUpdated) < parseInt(newState.users[0].lastUpdated)) this.setState(newState)
                if(this.state.users[0]){
                    
                    this.state.users[0].on('update').then( () => {
                        this.setState({})
                    })
                }
            })
        }
        if(typeof componentDidMount == 'function') componentDidMount.call(this)
      }
      this.componentWillUnmount = function(){
        if(this[pipe] instanceof Pipe) this[pipe].destroy()
        if(typeof componentWillUnmount == 'function') componentWillUnmount.call(this)
      }
  
    }
  }

export class Provider extends React.Component {

    state = {
        ready: false
    }

    async componentDidMount(){
        await Component.addConnection(settings.connections[0])
        this.setState({ ready: true })
    }

    render(){
        return (
            this.state.ready ? this.props.children : null
        )
    }

}