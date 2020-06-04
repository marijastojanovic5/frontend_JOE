import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Coffee from '../components/Coffee'

class CoffeeList extends Component {

  render(){
  return (
    <div>
    <div>
          <Link to="/profile">
          <div className="ui labeled button" tabIndex="0">
      <button className="ui inverted brown button"onClick={this.props.goToProfile}>See your favorites</button><br/>
      </div>
      </Link>
      </div>
      <br/><div className="ui four column grid"> 
        {this.props.coffee_shops.map(coffee=>
          <Coffee coffee={coffee} key = {coffee.id} selectShop={this.props.selectShop}/>)}
      </div>
      </div>
  )
  }
}

export default CoffeeList
