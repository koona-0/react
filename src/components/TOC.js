import React, {Component} from 'react';

class TOC extends Component{
    render(){
      console.log('TOC render');
      var data = this.props.data;
      var lists = [];
      var i = 0;

      while(i < data.length){
        //키 안주면 인터넷 콘솔 창에서 키달라는 오류가 뜨게 됨
        //여러개의 목록을 자동으로 생성할 때에는 각각의 목록을 다른 것들과 구별할 식별자 key를 줘야함
        lists.push(
          <li key={data[i].id}>
            <a 
              href={"/content/"+data[i].id}
              data-id={data[i].id}
              onClick={function(e){
                e.preventDefault();
                this.props.onChangePage(e.target.dataset.id);
                //타겟은 이 a태그를 가리킴
              }.bind(this)}
              >{data[i].title}</a>
          </li>)
        i = i + 1;
      }

      return(
        <nav>
              <ul>
                  {/* <li><a href="1.html">HTML</a></li>
                  <li><a href="2.css">CSS</a></li>
                  <li><a href="3.javascript">JavaScript</a></li> */}
                  {lists}
              </ul>
          </nav>
  
      );
    }
  }

  //외부에서 사용 할 수 있게 하기 위해
  export default TOC;
  //이거로 인해 이 클래스를 가져다 쓸 수 있게 됨
