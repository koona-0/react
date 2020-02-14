import React, {Component} from 'react';
import '../Control.css'

class UpdateContent extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      id:this.props.data.id,
      title:this.props.data.title,
      desc:this.props.data.desc
    }
    //바인드 계속 쓰는거 줄여 리팩토링
    this.inputFormHandler = this.inputFormHandler.bind(this);
  }

  inputFormHandler(e){
    this.setState({[e.target.name]:e.target.value});
  }

  render(){
    console.log(this.props.data);
    console.log('UpdateContent render');
    return(
      <article>
            <h2>Update</h2>
            <form action="/create_process" method="post"
              onSubmit={function(e){
                e.preventDefault();  
                this.props.onSubmit(
                  this.state.id,
                  this.state.title,
                  this.state.desc
                );
              }.bind(this)}
            >

{/* 업데이트를 하려면 어디를 바꿀지 식별자가 필요함 */}
              <input type = "hidden" name="id" value={this.state.id}></input>


              <p>
                <input 
                type="text" 
                name="title" 
                placeholder="title"
                value={this.state.title}
                onChange={this.inputFormHandler}></input>
              </p>
              <p>
                <textarea 
                name="desc" 
                placeholder="description" 
                value={this.state.desc}
                onChange={this.inputFormHandler}></textarea>
              </p>
              <p><input type="submit"></input></p>
            </form>
        </article>
    );
  }
}

export default UpdateContent; 