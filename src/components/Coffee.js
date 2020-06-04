import React from "react"
import {Link} from 'react-router-dom'

const Coffee  = props => {
    
        return(
            <Link to={`/coffeeshops/${props.coffee.id}`}> 
                <div className="column" onClick={()=>props.selectShop(props.coffee)}>
                <div  id="letter2" className="ui segment">
              <img  className= "ui image" src={props.coffee.image_url} style={{width: 250, height: 200}} alt ="coffee-pics"/>
                {props.coffee.name}<br/> 
                <div id="letters">
                Rating:{props.coffee.rating}<br/> Price:{props.coffee.price}
                </div>
                </div>
            </div> 
                </Link>

        )

}
export default Coffee