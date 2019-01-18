import React, { Component } from 'react'

export default class SearchResult extends Component {
  state = {
    favs: []   
  }

  // if(regex.exec(x.title) || regex.exec(x.keywords)){
        //   // title = x.title;
        //   // temp = new DOMParser().parseFromString(x.body, "text/html");
        //   // description = temp.documentElement.textContent;
        //   return x         // resultArr.push(item)
          // alert('here')
        // }
    //   })
    // });
    // console.log(resultArr)
    // console.log("teve")
    // this.setState({resultArr})


  getLink = (link) => {
      let actualLink = link.split("<a href=")[1]
      actualLink = actualLink.split(`"`)[1]
      let word = link.split(`">`)[1]
      word = word.split("</")[0]
    
      return {"link": actualLink, "word":word}    
    }

  convertLink = (text) => {
    let max = text.split('')
    let index = []
    for(let i = 0; i < max.length; i++){
      if(max[i].charCodeAt(0) == 60 && max[i+1].charCodeAt(0) == 97){
        index.push({"first": i})
      }else if(max[i].charCodeAt(0) == 62 && max[i-1].charCodeAt(0) == 97){
        index.push({"second": i})
      }
    }
    return index
  } 

  htmlToElements = (html) => {
      var template = document.createElement('template');
      template.innerHTML = html;
      return template.content.childNodes;
  }

  htmlToElement = (html) => {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
}


  sanitizeTxt = (txt) => {
    let q = txt.split('')
    let count = 0;
    for(let i = 0; i < q.length; i++){
      if(q[i].charCodeAt(0) === 38){
        while(q[i].charCodeAt(0) !== 59){
          if(count === 0){
            q[i] = q[i].replace(q[i], ' ')   
          }else{
            q[i] = q[i].replace(q[i], '')
          }
          count++
          i++
        }
        if(q[i].charCodeAt(0) === 59){
          q[i] = q[i].replace(q[i], '')
        }
      }
    }
    q = q.join('').trim()
    return q
  }

  getBoldWords = (str) => {
    let htmlTotal = [];
    let boldWords = [];

    for(let i = 0; i < str.length; i++){
      if(str[i].includes("<strong>")){
        // console.log(str[i])
  
        let de = str[i].split('<strong>')
        for(let i = 0; i < de.length; i++){
          if(de[i].includes("</")){
            let a = de[i].split('</strong>')
            boldWords.push(a[0])
          }
        }
      }else if(str[i].includes("<b>")){  
        let de = str[i].split('<b>')
        for(let i = 0; i < de.length; i++){
          if(de[i].includes("</")){
            let a = de[i].split('</b>')
            boldWords.push(a[0])
          }
        }
      }else if(str[i].includes("</a")){
        let a = this.htmlToElement(str[i])

        // console.log(a) 
        var cerant = a.childNodes;
        // console.log(cerant)
        // console.log("above")

        let temp = []
        for(let i = 0; i < cerant.length; i++){
          // console.log(cerant[i], typeof cerant[i], cerant[i].innerHTML, cerant[i].itemList, cerant[i].text)
          if(cerant[i].innerHTML){
            // console.log(cerant[i].innerHTML, cerant[i].outerHTML)
            // result += cerant[i].outerHTML
            // console.log('bellow')
            // console.log(cerant[i].href)
            // result += (<a href="">LOLOLOLOL</a>)
            temp.push(<a href={cerant[i].href}>{cerant[i].innerHTML}</a>)
          }else{
            // console.log(cerant[i].textContent)
            temp.push(cerant[i].textContent)
          }

        }
        
        // result = temp.reduce((acc, sum) => acc+=sum)
        // console.log("the result is " + result)
        htmlTotal.push(<p>{temp}</p>)
        // htmlTotal.push(<li>{result}</li>)
        // console.log("the result is")
        // console.log(result)
        // htmlTotal.push(<li>{a}</li>)
        // console.log(str[i] + "sauel  samuelae daeau")
        // let index = this.convertLink(str[i]);

        // for(let i = 0; i < index.length; i++){
        //   if(i % 2 === 0){
        //     let sbsrt = str[i].slice(index[i]["first"], index[i+1]["second"])
        //     alert(sbsrt)
        //     if(sbsrt.startsWith("<a")){
        //       let objs = this.getLink(sbsrt)
        //       let result = str[i].replace(sbsrt, <a href={objs["link"]}> {objs["word"]} </a>)
        //       htmlTotal.push(<li className="liTeste">{result}</li>)

        //     }
        //   }
        // }
      }
    }
    

    for(let i = 0; i < str.length; i++){
      if(str[i].includes("<strong>")){
        let a = str[i].split("<strong>");

        htmlTotal.push(<li className="liTeste">{a[0]}<strong>{boldWords[i]}</strong></li>);
      }
      else if(str[i].includes("<b>")){
        let a = str[i].split("<b>");

        htmlTotal.push(<li className="liTeste">{a[0]}<strong>{boldWords[i]}</strong></li>);
      }
      else if(str[i].includes("</a")){
        console.log("he")
      }
      else {
        htmlTotal.push(<li className="liTeste">{str[i]}</li>)
      }
    }

    return htmlTotal
  }

  domParser = (str) => {
    let temp = new DOMParser().parseFromString(str, "text/html");
    let res = this.htmlToElements(temp.documentElement.textContent)
    // console.log(res)
    let test = this.htmlToElements(res[0].innerHTML)
    test = [...test]
    console.log(test)
    console.log('-------------------------------------')
    let final = test.filter(x => x.innerHTML).map(x => x.innerHTML)
    let thise = final.map(x => this.sanitizeTxt(x))
    // console.log("thise is" + thise)

    let bolds = this.getBoldWords(thise)
    // console.log(bolds +"bolds")

    return bolds
    // return <h1>samuel</h1>
    // console.log(regex.exec(temp.documentElement.textContent))
    // console.log(temp)
    // return temp.documentElement.textContent
    // return temp
    // var el = document.createElement( 'div' );
    // el.innerHTML = temp.documentElement.textContent;;
    // return el
  }

//     htmlToElement(html) {
//     var template = document.createElement('template');
//     html = html.trim(); // Never return a text node of whitespace as the result
//     template.innerHTML = html;
//     let result = 
//     return template.content.firstChild;
// }

// var td = htmlToElement('<td>foo</td>'),
//     div = htmlToElement('<div><span>nested</span> <span>stuff</span></div>');

_favoriteItem = (x) => {
  // alert("Clicou na start " + event.target)
  x["starred"] = true
  const favs = [...this.state.favs, {x}]
  // console.log(favs + "favs")
  this.setState({favs})
  // console.log(event.starred)
}

_unfavoriteItem = (x, index) => {
  // alert("Clicou na start " + event.target)
  // alert('this is favorite')
  x["unstarred"] = true
  // alert(index)
  // const favs = this.state.favs.filter(x => {
  //   alert(x.index)})
    //  !== index)
  const favs = this.state.favs.filter(x => {
    // alert(x.x.index + "x.x.index")
    // alert(index + "index")

    return x.x.index !== index
  
  })

  this.setState({favs})
  // x["starred"] = true
  // const favs = [...this.state.favs, {x}]
  // // console.log(favs + "favs")
  // this.setState({favs})
  // console.log(event.starred)
}
// var rows = htmlToElements('<tr><td>foo</td></tr><tr><td>bar</td></tr>');

  render() {
    const { itemList } = this.props;  

    const title = Object.keys(itemList).length !== 0 ? itemList.map((x, index) => {
      x["index"] = index;
      return (<div className="searchResult" key={index}><span className="searchResult__title">
              <i className={x.starred && !x.unstarred ? "fa fa-star searchResult__icon searchResult__icon--starred" : "fa fa-star searchResult__icon"} 
                  aria-hidden="true" 
                  id={index}
                  onClick={() => {this._favoriteItem(x)}}>
                  </i>
                  
              <h4 className="searchResult__h4">{x.title}</h4>
              </span>
              <ul className="searchResult__ul">
                  {this.domParser(x.body).map(x => {
                    return <li className="liTeste">{x}</li>
                  })}
                {/* <li> */}
                {/* </li> */}
              </ul>
              {/* {x.description} */}
              {/* <ul className="searchResult__ul">
                {x.description.map(elem => ( <li>{elem}</li> ))}
              </ul> */}
              </div>)
    }) : ''      

  const Favs = this.state.favs ? this.state.favs.map((x,index) => {
    return (<div className="searchResult" key={index}><span className="searchResult__title">
          <i className={x.x.starred ? "fa fa-star searchResult__icon searchResult__icon--starred" : "fa fa-star searchResult__icon"} 
          aria-hidden="true"
          id={index}
          onClick={() => {this._unfavoriteItem(x.x, x.x.index)}}
          ></i>
          <h4 className="searchResult__h4">{x.x.title}</h4>
          </span>
          <ul className="searchResult__ul">
                  {this.domParser(x.x.body).map(x => {
                    return <li className="liTeste">{x}</li>
                  })}
                {/* <li> */}
                {/* </li> */}
              </ul>
              {/* {x.description} */}
              {/* <ul className="searchResult__ul">
                {x.description.map(elem => ( <li>{elem}</li> ))}
              </ul> */}
              </div>)
    }) : ''   

  // const Favs = this.state.favs ? this.state.favs.map(x => {
  //   return (<div className="searchResult"><span className="searchResult__title">
  //       <i className={x.starred ? "fa fa-star searchResult__icon searchResult__icon--starred" : "fa fa-star searchResult__icon"} aria-hidden="true"></i>
  //       <h4 className="searchResult__h4">{x.title}</h4>
  //       </span>
  //       <ul className="searchResult__ul">
  //         {x.description.map(elem => ( <li>{elem}</li> ))}
  //       </ul>
  //       </div>)}) : ''   

    
    return (
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
