import React from 'react'

const NavBar = (props) => {
return(
    <div id={"sortLabel"} className="ui basic big horizontal label"> 
        <input className="form-control" placeholder="Search by name..." onChange={props.onSearch}/>
     
      
    </div>
)
}
export default NavBar