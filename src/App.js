import React, {Component} from 'react';

import TOC from "./components/TOC"
import ReadContent from "./components/ReadContent"
import CreateContent from "./components/CreateContent"
import Subject from "./components/Subject"
import Control from "./components/Control"
import './App.css';

class App extends Component{
  constructor(props){
    super(props);
    //contents개수를 state로 하지 않고 객체로 한 이유
    //객체로 하면 데이터를 push할때 UI에 영향줄 이유 없음, 하면 불필요한 렌더링 발생
    this.max_content_id = 3;
    this.state = {
      mode:'create',
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

  render(){
    console.log('App render');
    var _title, _desc, _article= null;
    if(this.state.mode === 'welcome'){ //이것도 원본을 교체한 것으로 볼 수 있음
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    }else if(this.state.mode === 'read'){
      var i = 0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id){
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i = i + 1;
      }
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if(this.state.mode === 'create'){
      _article = <CreateContent onSubmit={function(_title, _desc){
        this.max_content_id = this.max_content_id + 1;
        //push 사용
        // this.state.contents.push( //이렇게 하면 리액트가 모름... 몰래바꾸기임
        //   {id:this.max_content_id, title:_title, desc:_desc}
        // )
        //객체를 바꾸고 싶을 때 array.asign
        //배열을 바꾸고 싶을 때 array.from
        var _contents = this.state.contents.concat(
          {id:this.max_content_id, title:_title, desc:_desc}
        )

        this.setState({ //이렇게 추가
          // contents:this.state.contents //push 사용할 때
          contents:_contents
        });
        console.log(_title, _desc);

      }.bind(this)}></CreateContent>
    }
    //push로 추가하는 방법은 사실 좋은 방법이 아님. 나중에 성능개선 까다로움
    //push가 아닌 concat 이용하기
    //push는 원본을 바꾼다
    //concat은 원본을 바꾸지 않는다. 오리지널 데이터 변경이 아닌 새로운 데이터 추가


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
            selected_content_id:Number(id) //문자를 숫자로 바꿔주는 자바스크립트 함수 Number
          });
        }.bind(this)} 
        data={this.state.contents}>
        </TOC>

{/* 이벤트가 실행됐을때 실행 되어야하는 함수 : 핸들러 */}
        <Control onChangeMode={function(_mode){
          this.setState({
            mode:_mode
          })
        }.bind(this)}></Control>


        {_article}
        
      </div>
    );
  }
}

export default App;