import React, {Component} from 'react';

class TOC extends Component{
  //현재 보여지고 있는 목록인데 다시 클릭하면 쓸데없이 렌더링됨
  //그런것을 제어하기 위해 shouldComponentUpdate 사용
  //render함수 이전에 실행됨
  //두개의 매개변수 사용
  //newProps는 TOC Component의 props가 바뀌었을 때의 값
  //newState는 state가 바뀌었을 때의 값
  //return값이 true이면 render 호출, false이면 render 호출 x
  //바뀐값과 이전값을 알 수 있음

  //===> TOC로 들어오는 props의 값이 바뀌었을 때 render호출되도록 만들기 가능

  //여기서 App.js에서 push이용하면 원본을 바꾸었기 때문에 이전값과 이후값이 같아짐
  //그래서 concat이용하여 복제본을 이용해서 비교하면서 함 //성능 향상 
  //불변성 immutable : 원본을 바꾸지 않음
  shouldComponentUpdate(newProps, newState){ 
    console.log('-> TOC render shouldComponentUpdate'
    ,newProps.data      //바뀐값을 알 수 있음
    ,this.props.data    //현재값을 알 수 있음
    );
    if(this.props.data === newProps.data){
      return false;
    }
    return true; //true
  }
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
              onClick={function(e){ //속성을 (id, e) 로 바꾸어 밑 코드를 간결하게 바꾸기 가능
                e.preventDefault();
                this.props.onChangePage(e.target.dataset.id); //여기 속성은 (id)로
                //타겟은 이 a태그를 가리킴
              }.bind(this)}//여기속성은 (this, data[i].id)로
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
