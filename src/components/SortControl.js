import React from 'react'
const SortControl = (props) => {
    return (
        <div className="filterWrapper">

            <div id={"sortLabel"} className="ui basic small horizontal label">Sort By:</div> 
            <button
                className="ui inverted brown button"
                onClick={(event) => props.handleSort(event.target.innerText)}
            >Price</button>
            <button
                className="ui inverted brown button"
                onClick={(event) => props.handleSort(event.target.innerText)}
            >Rating</button>
        </div>
    )
  }


export default SortControl