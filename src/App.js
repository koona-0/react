import React, {Component} from 'react';

import './App.css';
import TOC from "./components/TOC"
import Content from "./components/Content"
import Subject from "./components/Subject"

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      mode:'welcome',
      subject:{title:'WEB', sub:'world wide web!'},
      welcome:{title:'Welcome', desc:'Hello, React!'},
      contents:[
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive'}
      ]
    }
  }

  render(){
    console.log('App render');
    var _title, _desc = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    }else if(this.state.mode === 'read'){
      _title = this.state.contents[0].title;
      _desc = this.state.contents[0].desc;
    }


    return (
      <div className="App">
        {/* <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}>
        </Subject> */}
        <header>
              <h1><a href="/" onClick={function(e){
                console.log(e);
                e.preventDefault();
                //this.state.mode = 'welcome';
                //위 코드는 그냥 쓰면 오류남 두가지의 문제를 품고 있음 ㅠ.ㅠ
                //this값이 아무값으로도 세팅되어있지 않음

                this.setState({
                  mode:'welcome'
                });
              }.bind(this)}>{this.state.subject.title}</a></h1>
              
              {/* 함수가 끝난 직후 .bind(this) 쓰면 그 함수 안에서 this는 컴포넌트가 됨*/}
              {/* 그래도 오류가 난다 리액트는 state의 값이 바뀌었다는것을 모름 
              리액트 사용설명서가 시키는 대로  this.setState 사용한다*/}
              {this.state.subject.sub}
        </header>

        <TOC data={this.state.contents}></TOC>

        <Content title={_title} desc={_desc}></Content>
      </div>
    );
  }
}

export default App;