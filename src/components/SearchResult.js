import React, { Component } from 'react'
import Spinner from './Spinner'

export default class SearchResult extends Component {
  state = {
    favs: [],
    starred: []
  }

  getLink = (link) => {
  //This is to extract the link and the name 
    let actualLink = link.split("<a href=")[1]
    actualLink = actualLink.split(`"`)[1]
    let word = link.split(`">`)[1]
    word = word.split("</")[0]
  
    return {"link": actualLink, "word":word}    
  }

  convertLink = (text) => {
    // Char < Ascii Code 60
    // Char > Ascii Code 62
    // Char 'a' Ascii Code 97

    let max = text.split('')
    let index = []

    //For loop to get the indexes of the start and end of the <a> tags
    for(let i = 0; i < max.length; i++){
      if(max[i].charCodeAt(0) === 60 && max[i+1].charCodeAt(0) === 97){
        index.push({"first": i})
      }else if(max[i].charCodeAt(0) === 62 && max[i-1].charCodeAt(0) === 97){
        index.push({"second": i})
      }
    }
    return index
  } 
  
  htmlToElements = (html) => {
    //Can convert a string to html
    let template = document.createElement('template');
    template.innerHTML = html;

    //returns NodeList
    return template.content.childNodes;
  }

  htmlToElement = (html) => {
    //Can convert a string to html
    let template = document.createElement('template');
    template.innerHTML = html;

    //returns element
    return template.content;
}

  sanitizeTxt = (txt) => {
    //A little helper function to clean the html entitiy
    let splitText = txt.split('')
    let count = 0;
    
    for(let i = 0; i < splitText.length; i++){
      if(splitText[i].charCodeAt(0) === 38){
        while(splitText[i].charCodeAt(0) !== 59){
          if(count === 0){
            splitText[i] = splitText[i].replace(splitText[i], ' ')   
          }else{
            splitText[i] = splitText[i].replace(splitText[i], '')
          }
          count++
          i++
        }
        if(splitText[i].charCodeAt(0) === 59){
          splitText[i] = splitText[i].replace(splitText[i], '')
        }
      }
    }
    splitText = splitText.join('').trim()
    return splitText
  }

  getBoldWords = (str) => {
    let htmlTotal = [];
    let boldWords = [];

    for(let i = 0; i < str.length; i++){
      if(str[i].includes("<strong>")){  
        let temp = str[i].split('<strong>');

        for(let i = 0; i < temp.length; i++){
          if(temp[i].includes("</")){
            let tempFinal = temp[i].split('</strong>')
            boldWords.push(tempFinal[0])
          }
        }
      }else if(str[i].includes("<b>")){  
        let temp = str[i].split('<b>')
        for(let i = 0; i < temp.length; i++){
          if(temp[i].includes("</")){
            let tempFinal = temp[i].split('</b>')
            boldWords.push(tempFinal[0])
          }
        }
      }else if(str[i].includes("</a")){
        let tempFinal = this.htmlToElement(str[i])
        let nodes = tempFinal.childNodes;
        let temp = []

        for(let i = 0; i < nodes.length; i++){
          if(nodes[i].innerHTML){
            temp.push(<a href={nodes[i].href}>{nodes[i].innerHTML}</a>)
          }else{
            temp.push(nodes[i].textContent)
          }
        }

        htmlTotal.push(<p>{temp}</p>)
      }
    }
    
    for(let i = 0; i < str.length; i++){
      if(str[i].includes("<strong>")){
        let temp = str[i].split("<strong>");

        htmlTotal.push(<li>{temp[0]}<strong>{boldWords[i]}</strong></li>);
      }
      else if(str[i].includes("<b>")){
        let temp = str[i].split("<b>");

        htmlTotal.push(<li>{temp[0]}<strong>{boldWords[i]}</strong></li>);
      }
      else if(str[i].includes("</a")){
        console.log("nothing to see here")
      }
      else {
        htmlTotal.push(<li>{str[i]}</li>)
      }
    }
    return htmlTotal
  }

  domParser = (str) => {
    //To get the string with html elems and covert, sanitize and prepare for rendering
    let parsedStr = new DOMParser().parseFromString(str, "text/html");
    let parsedContent = this.htmlToElements(parsedStr.documentElement.textContent)
    let parsedContentText = this.htmlToElements(parsedContent[0].innerHTML)
    parsedContentText = [...parsedContentText]
    let prepTxt = parsedContentText.filter(x => x.innerHTML).map(x => x.innerHTML)
    let sanitizedTxt = prepTxt.map(x => this.sanitizeTxt(x))
    let element = this.getBoldWords(sanitizedTxt)

    return element
  }

  _favoriteItem = (x, index) => {
    //Since the props doesnt have a starred field, I created a little logic to check if said item has been starred
    //If the result is true, it means that the Item is starred, so it needs to be unstarred
    let result = this.state.starred.filter(x => {
      return x.starItem.index === index && x.starItem.starred === true
    })

    if(result.length > 0){
      //Case when the Item is already starred
      const starItem = {"index": index, "starred": false}
      let starred = this.state.starred.filter(x => {
        return x.starItem.index !== index
      })
      starred = [...starred, {starItem}]
      this.setState({starred})   
      this._unfavoriteItem(x, index)
     
    }else{
      //Case when the Item is not starred
      const starItem = {"index": index, "starred": true}
      const starred = [...this.state.starred, { starItem }]
      const favs = [...this.state.favs, {x}]
      this.setState({starred})
      this.setState({favs})
    }
  }

  _unfavoriteItem = (x, index) => { 
    //to remove an item from the starred list
    const favs = this.state.favs.filter(x => {
      return x.x.index !== index
    })
      const starItem = {"index": index, "starred": false}
      let starred = this.state.starred.filter(x => {
        return x.starItem.index !== index
      })
      starred = [...starred, {starItem}]
      this.setState({starred})   
      this.setState({favs})
  }

  render() {
    const { itemList, loading } = this.props; 
    const title = Object.keys(itemList).length !== 0 ? itemList.map((x, index) => {
      x["index"] = index;
      x["starred"] = false;
      let starred = this.state.starred.filter(x => {
        return x.starItem.index === index && x.starItem.starred === true
      })
      
      return (<div className="searchResult" key={index}><span className="searchResult__title">
              <i className={starred.length > 0 ? "fa fa-star searchResult__icon searchResult__icon--starred" : "fa fa-star searchResult__icon"} 
                  aria-hidden="true" 
                  id={index}
                  onClick={() => {this._favoriteItem(x, index)}}>
                  </i>
                  
              <h4 className="searchResult__h4">{x.title}</h4>
              </span>
              <ul className="searchResult__ul">
                  {this.domParser(x.body).map(x => {
                    return <li>{x}</li>
                  })}
              </ul>
              </div>)
    }) : ''      

  const Favs = this.state.favs ? this.state.favs.map((x,index) => {
    let starred = this.state.starred.filter(x => x.starItem.index === index)
    return (<div className="searchResult" key={index}><span className="searchResult__title">
          <i className={starred.length > 0 ? "fa fa-star searchResult__icon searchResult__icon--starred" : "fa fa-star searchResult__icon"} 
          aria-hidden="true"
          id={index}
          onClick={() => {this._unfavoriteItem(x.x, x.x.index)}}
          ></i>
          <h4 className="searchResult__h4">{x.x.title}</h4>
          </span>
          <ul className="searchResult__ul">
                  {this.domParser(x.x.body).map(x => {
                    return <li>{x}</li>
                  })}
          </ul>
          </div>)
    }) : ''   
  
    return loading ? ( <Spinner /> ) : (
      <div>
        {title}
        <div className={this.state.favs.length > 0 ? "favouritesWrapper" : 'noFavourites'}>
          <h2 className="favourites__h2">Favourites</h2>
          {Favs}
        </div>
      </div>
    )
  }
}
