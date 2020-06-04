import React, { Component } from 'react';
import NavBar from './components/NavBar'
import CoffeeList from './containers/CoffeeList'
import CoffeeCard from "./components/CoffeeCard"
import LoginForm from "./components/LoginForm"
import UserProfile from "./components/UserProfile"
import TitleBar from "./components/TitleBar"
import SortControl from "./components/SortControl"
import {Route, Switch, Redirect} from 'react-router-dom'
import './App.css';

class App extends Component {
  state = {
    coffeeShops: [],
    displayedShops: [],
    selectedShop: null,
    currentUser: null,
    loggingIn: true,
    onProfilePage: false,
    favorites: [],
    searchText: "",
    sort: "price"
  }
  
  componentDidMount(){
    fetch("http://localhost:4000/coffee_shops")
    .then(r=>r.json())
    .then(coffeeList=>
      this.setState({
        coffeeShops: coffeeList,
        loggingIn: false
      })
      )
    }

    loginSubmit = (user) =>{
      
      this.setState({
      currentUser: user.name
      })
    }
    
  
    addToFavorites =(shop)=>{
    // debugger
    // let userObject = this.state.currentUser
    // fetch(`http://localhost:4000/favorites`, {
    //     method: 'POST',
    //     headers: {
    //             "Content-Type": "application/json",
    //             "Accept": "application/json"
    //     },
    //     body: JSON.stringify({user_id: userObject.id, coffee_shop_id: coffeeShop.id}),
    // }).then(r=>r.json())
    //   .catch(error => console.error('Error:', error))
    //   .then(r=> console.log(r)
    //   )
    //   alert("Added to favorites")

    if(this.state.currentUser === null){
      alert("please login")
    }
    else if(this.state.favorites.includes(shop)){
      alert("You already added this shop to your favorites")
    }else{
      let newShop = [...this.state.favorites, shop]
      this.setState({favorites : newShop})
    }
  }

  removeFromFavorites =(shop)=>{
    if(!this.state.favorites.includes(shop)){
      alert("This shop is not in your favorites")
    }else{
    let newArray = this.state.favorites.filter(s=> s !== shop)
    this.setState({favorites : newArray})}
  }

  
  

  onSearch = (event) => {
    this.setState({searchText: event.target.value})
    
  }

handleSort = (value) => {
    value === "Price"
    ?
    this.setState({sort: "price"})
    :
    this.setState({sort: "rating"})
  }
  getSorted(){
    
    let value = this.state.sort
    return(
    value === "price"
    ?
    (this.state.displayedShops.sort((shop1, shop2) => shop1[value] > shop2[value] ? 1 : -1))
    :
    (this.state.displayedShops.sort((shop1, shop2) => shop1[value] > shop2[value] ? -1 : 1)))
  }
  
  resetList = () =>{
    let allShops = this.state.coffeeShops
    this.setState({
      selectedShop: null,
      displayedShops: allShops,
      searchText: ""
      })
  }
  selectShop = (shop) =>{
    this.setState({selectedShop: shop})
  }

  goToProfile = () =>{
    
    let favorites = this.state.favorites
    this.state.currentUser
    ?
    this.setState({
      displayedShops: favorites,
      onProfilePage: true})
    :
    alert("please login")
  }

  render(){

    let sortedShops = this.getSorted(this.state.sort)
    let searchedShops = sortedShops.filter(s => s.name.toLowerCase().includes(this.state.searchText.toLowerCase()))
  return (
    <div className="App">
      <TitleBar  />
   
    {this.state.currentUser && this.state.displayedShops.length > 0 ? <NavBar user={this.state.currentUser} loginClick={this.loginClick} onSearch={this.onSearch}/>: null}
    {this.state.currentUser && this.state.displayedShops.length > 0  ? <SortControl sort={this.state.sort} getSorted={this.getSorted} handleSort={this.handleSort}/>: null}<br/>
            
     <Switch>
            <Route path="/coffeeshops/:id" render={(props) => {
              let id = parseInt(props.match.params.id)
              let selectedShop = this.state.coffeeShops.find(s=>s.id === id)
              return <CoffeeCard
              shop={selectedShop} addToFavorites={this.addToFavorites} favorites={this.state.favorites} goBack={this.resetList} removeFromFavorites={this.removeFromFavorites}/>
            }} />
            <Route exact path="/coffeeshops" render={()=>
              <CoffeeList coffee_shops={searchedShops} selectShop={this.selectShop} goToProfile={this.goToProfile}/>
            }/>
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            <Route exact path="/profile" render={() => {
              return this.state.currentUser ? <UserProfile user={this.state.currentUser} display = {searchedShops} goBack={this.resetList} selectShop={this.selectShop} getSorted={this.getSorted}/> :
                <Redirect to="/login"/>
            }} />
            <Route exact path="/login" render={() => {
              return this.state.currentUser ? <Redirect to="/profile"/> : <LoginForm
                loginSubmit={this.loginSubmit}
              />
            }} />
          </Switch>

    
    </div>
  
  )
  }
}

export default App;
