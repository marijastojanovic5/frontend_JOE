import React from "react"
import {Link} from 'react-router-dom'
class CoffeeCard extends React.Component {
    render(){
        return(
            <div id="letter">
              {this.props.shop.name}<br/>
             <img alt ="coffee-card" src ={this.props.shop.image_url} /><br/>
              Price: {this.props.shop.price}<br/>
              Phone number: {this.props.shop.display_phone}<br/>
              Rating: {this.props.shop.rating}<br/>
              Location: {this.props.shop.location}<br/>

             
              <div className="ui labeled button" tabIndex="0">
              
              <button  className="ui inverted brown button" disabled={this.props.favorites.includes(this.props.shop) ? true : false} onClick={()=>this.props.addToFavorites(this.props.shop)}>Add to your favorites </button>
              </div>
              <div className="ui labeled button" tabIndex="0">
              <button className="ui inverted brown button" disabled={this.props.favorites.includes(this.props.shop) ? false : true}onClick={()=>this.props.removeFromFavorites(this.props.shop)}>Remove from favorites</button>
              </div>
              <p>
             <img src={`https://maps.googleapis.com/maps/api/staticmap?zoom=17&size=400x300&markers=size:small%7Ccolor:red%7C${this.props.shop.latitude},${this.props.shop.longitude}&key=${process.env.REACT_APP_GOOGLEMAPS_API_KEY}`} alt="map-pic"/>
                </p>
          <Link to="/coffeeshops">
          <div className="ui labeled button" tabIndex="0">
          <button className="ui inverted brown button" onClick={this.props.goBack}>See all coffee shops in DC</button>
          </div>
          </Link>
              
            </div>
        )
    }
}
export default CoffeeCard