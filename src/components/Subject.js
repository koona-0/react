import React, {Component} from 'react';

class Subject extends Component{
    render(){
      console.log('Subject render');
      return (
        <header>
              {/* <h1>WEB</h1> */}
              <h1><a href="/">{this.props.title}</a></h1>
              {/* world wide web! */}
              {this.props.sub}
        </header>
      );
    }
  }

  export default Subject;