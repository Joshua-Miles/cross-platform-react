import React, { Component } from 'react'

export default class TextInput extends Component {

    componentDidMount(){
      const { input } = this
      var selection = window.getSelection();
      console.log(selection)
      // var range = document.createRange();
      // range.setStart(input.childNodes[2], 5);
      // range.collapse(true);
      // sel.removeAllRanges();
      // sel.addRange(range);
    }


    render(){
        return (
            <p ref={ (ref) => this.input = ref} contentEditable={true} 
            
              onKeyDown={ (e) => {
                  var { focusOffset, focusNode } = window.getSelection();
                  if(typeof this.props.onInput === 'function') this.props.onInput(focusNode, focusOffset, e.key)
                  e.preventDefault()
              }}

             {...this.props}>
                {this.props.children}
            </p>
        )
    }

} 