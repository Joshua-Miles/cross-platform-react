import React, { Component } from 'react';
import {Container, Item, Input, Content, Header, Card, CardItem, Body, Icon, Text } from 'native-base';
import { View } from 'react-native'
import TextInput from './text-editor/TextInput'
export default class App extends Component {

  constructor(){
    super()
    this.elements = {}
  }

  state = new Document({
    "@content": [
        {
            "id": 1,
            "type":"text",
            "text": "Hello World!",
            "marks": {
              "comments": [ 1 ] 
            }
        },
        {
            "type":"paragraph",
            "@content": [
                {
                    "id": 2,
                    "type":"text",
                    "text": "Hello World!",
                    "marks": {
                      "comments": [ 1, 2 ] 
                    }
                }
            ]
        }
    ],

    "comments": [
      {
        "id": 1,
        "content": ">)"
      },
      {
        "id": 2,
        "content": ":)"
      } 
      
    ], 

    "selections":[
        {
          "type": "range||position",
          "start": "",
          "end":""
      }
    ]

})


  componentDidUpdate(){
    let { activeNode } = this.state
    let el = this.elements[activeNode]
    if(!el) return
    var range = document.createRange();
    var sel = window.getSelection();
    range.setStart(el, this.state.offset);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  handleInput= (node, offset, key) => {
    const { activeNode } = this.state
    this.elements[activeNode] = node
    this.setState( (state) => {
      const { text } = state["@nodes"][activeNode]
      state["@nodes"][activeNode].text = `${text.substr(0, offset)}${key}${text.substr(offset)}`
      state.offset = offset + 1
      return state
    })
  }

 
  render() {
     return (
        <TextInput onInput={this.handleInput}>
          {this.state["@content"].map( node => {
            const EditorComponent = EditorComponents[node.type]
            return <EditorComponent key={node.id} {...node} onClick={() => {  this.setState({ activeNode: node.id })}}/>
          })}
        </TextInput>
     )
  }

}


const EditorComponents = {

  text: class extends Component {

    render(){
      return ( 
        <Text onClick={() => this.props.onClick && this.props.onClick() } >{this.props.text}</Text> 
      )
    }

  },
   
  paragraph: class extends Component {

    render(){
      return (
        <Text style={{ flex:1}}>
          {'\n'}
          {this.props["@content"].map( node => {
            const EditorComponent = EditorComponents[node.type]
            return <EditorComponent key={node.id} {...node} />
          })}
        </Text>
      )
    }

  }

}


class Document {

  constructor(data){
    Object.assign(this, data)

    this["@nodes"] = {}

    let crawl = (data) => {
      if(data["@content"]) data["@content"].forEach( node => {
        this["@nodes"][node.id] = node
        crawl(node)
      })
    }

    crawl(data)

  }

}