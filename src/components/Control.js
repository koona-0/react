import React, {Component} from 'react';

class Control extends Component{
    render(){
      console.log('Control render');
      return (
        <ul> 
          <li><a href="/create" onClick={function(e){
            e.preventDefault();
            this.props.onChangeMode('create');
          }.bind(this)}>create</a></li>

          <li><a href="/update" onClick={function(e){
            e.preventDefault();
            this.props.onChangeMode('update');
          }.bind(this)}>update</a></li>

          <li><input onClick={function(e){
            e.preventDefault();
            this.props.onChangeMode('delete');
          }.bind(this)} type="button" value="delete"></input></li>
        </ul>
      );
    }
  }
  // read, create, update는 특정 페이지로 가서 오퍼레이션 실행
  // delete는 그 버튼을 클릭할 때 삭제가 일어나도록 할 것인데 링크를 쓰면 문제가 일어남
  // 사용자들이 페이지 방문할 때 더 빨리 방문하게 미리 방문하게 해 두는
  // 소프트웨어가 깔려있으면 미리 delete를 방문하고 삭제가 될 수 있음
  // 페이지 개념이 아닌 버튼같은 오퍼레이션 개념을 사용하는게 맞음

  export default Control;