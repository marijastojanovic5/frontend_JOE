import React from "react"
import { Button, Form, Segment } from "semantic-ui-react"
class LoginForm extends React.Component {
    state = {
        name: "",
        password: ""
    }

    handleLoginSubmit = () => {
      fetch('http://localhost:4000/login', {
      method: "POST",
      headers: {
        "Content-Type" :"application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: this.state.name,
        password: this.state.password
      })
    }).then(res => res.json())
    .then(data => {
      if(data.successful){
        let user = data.data
        localStorage.setItem("jwt", data.token)
        this.props.loginSubmit(user)
      }else{
        alert(data.message)
      }
    })
  };
    render(){
     
        return(

        <Segment>
        <Form
            onSubmit={this.handleLoginSubmit}
            >
            <Form.Group widths="equal">
            <Form.Input
            label="username" value={this.state.name} onChange={(event)=>this.setState({name: event.target.value})}
            />
            <Form.Input            
            type="password" label="password" value={this.state.password} onChange={(event)=>this.setState({password: event.target.value})}/>
            </Form.Group>
            <Button type="submit">Login </Button>
            </Form>
            </Segment>
        ) 
    }
}

export default LoginForm