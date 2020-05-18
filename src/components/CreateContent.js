import React, {Component} from 'react';

class CreateContent extends Component{
  render(){
    console.log('Content render');
    return(
      <article>
            <h2>Create</h2>
            {/* create_process로 사용자가 입력한 정보를 전달
            사용자가 데이터 추가 삭제 할 때 메소드가 post 방식으로 가야 url노출이 안됨 */}
            <form action="/create_process" method="post"
              onSubmit={function(e){
                e.preventDefault(); //리액트니까 페이지 안바뀌게 하기 위함 
                //e.target은 form
                this.props.onSubmit(
                  e.target.title.value,
                  e.target.desc.value
                );
              }.bind(this)}
            >
              <p><input type="text" name="title" 
                  placeholder="title"></input></p>
                  {/* placeholder란 값이 입력이 안되어있을때 출력될 메세지 */}
              <p>
                <textarea name="desc" placeholder="description"></textarea>
              </p>
              <p>
                <input id="submit_btn" type="submit"></input>
              </p>
            </form>
        </article>
    );
  }
}

export default CreateContent; 