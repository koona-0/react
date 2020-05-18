import React, {Component} from 'react';

import TOC from "./components/TOC"
import ReadContent from "./components/ReadContent"
import CreateContent from "./components/CreateContent"
import UpdateContent from "./components/UpdateContent"
import Subject from "./components/Subject"
import Control from "./components/Control"
import './css/first.css'


class App extends Component{
  constructor(props){
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode:'welcome',
      selected_content_id:2,
      subject:{title:'WEB', sub:'world wide web!'},
      welcome:{title:'Welcome', desc:'Hello, React!'},
      contents:[
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive'}
      ]
    }
  }

  getReadContent(){
    var i = 0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id){
          // _title = data.title;
          // _desc = data.desc;
          return data;
        }
        i = i + 1;
      }
  }

  getContent(){
    var _title, _desc, _article= null;

    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    }
    
    else if(this.state.mode === 'read'){
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    } 
    
    else if(this.state.mode === 'create'){
      _article = <CreateContent onSubmit={function(_title, _desc){
        this.max_content_id = this.max_content_id + 1;
        var _contents = Array.from(this.state.contents);  //concat과 같은 효과
        _contents.push({id:this.max_content_id, title:_title, desc:_desc})
        this.setState({ 
          contents:_contents,
          mode:'read',
          selected_content_id:this.max_content_id
        });
        console.log(_title, _desc);

      }.bind(this)}></CreateContent>
    }

    else if(this.state.mode === 'update'){
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={
        function(_id,_title, _desc){
          var _contents = Array.from(this.state.contents); //자바스크립트의 기능 원본을 복사한 새로운 배열 생성
          //불변함. 원본을 바꾸지 않는 테크닉. 나중에 성능을 튜닝할 때 필요
          var i = 0;
          while(i < _contents.length){
            if(_contents[i].id === _id){
              _contents[i] = {id:_id, title:_title, desc:_desc}
              break;
            }
            i = i + 1;
          }
          this.setState({ 
            contents:_contents,
            mode:'read'
          });
        console.log(_title, _desc);

      }.bind(this)}></UpdateContent>
    }
    return _article;
  }

  render(){
    console.log('App render');

    return (
      <div className="App">
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          onChangePage={function(){
            this.setState({mode:'welcome'});
          }.bind(this)}
          >
        </Subject>

        <TOC onChangePage={function(id){
          this.setState({
            mode:'read',
            selected_content_id:Number(id) 
          });
        }.bind(this)} 
        data={this.state.contents}>
        </TOC>

        <Control onChangeMode={function(_mode){
          if(_mode === 'delete'){
            if(window.confirm('삭제하시겠습니까?')){
              //누구를 삭제할 것인가
              var _contents = Array.from(this.state.contents);
              var i = 0;
              while(i < _contents.length){
                if(_contents[i].id === this.state.selected_content_id){
                  _contents.splice(i,1);  
                  //splice : 어디서부터 어디까지 지울것인가 지정
                  //_contents의 원본을 바꾸게 됨
                  break;
                }
                i = i + 1;
              }
              this.setState({
                mode:'welcome',
                contents:_contents
              });
              alert('삭제되었습니다!');
            }
          }
          else{
            this.setState({
              mode:_mode
            })
          }
        }.bind(this)}></Control>
        {this.getContent()}
      </div>
    );
  }
}

export default App;