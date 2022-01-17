import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
// import PropTypes from 'prop-types'


export class News extends Component {
    capitalizeFirstLetter=(string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
      

    constructor(props){
        super(props);
        console.log("Hello I am a constructor from News Component");
        this.state= {
            ginger: [],
            loading: true,
            page:1
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)}-News Zone`
    }

    async updateNews(){
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=400f417eb95d4cbaaedd1d004f15cef0&page=${this.state.page}&pageSize=${this.props.pageSize}`
        const data = await fetch(url);
        const jsonData = await data.json();
        this.setState({ginger: jsonData.articles,totalData: jsonData.totalResults,loading: false });
    }

    async componentDidMount(){
      this.updateNews();
    }

    handlePreClick= async () =>{
    this.setState({page: this.state.page-1});
    this.updateNews();
    }
    handleNextClick=  async () =>{
        this.setState({page: this.state.page+1});
        this.updateNews();
    }
    

    render() {
        return (
            <div className='container my-3' >
                <h1 className='text-center' style={{margin: '40px 0px'}}>NewsZone - Top Headlines.</h1>
                {this.state.loading && <Spinner/>}
                <div className='row'>
                {!this.state.loading && this.state.ginger.map((garlic)=>{
                    return <div className='col-md-4'  key={garlic.url}>
                        <NewsItem title = {garlic.title?garlic.title.slice(0,45):''} description = {garlic.description?garlic.description.slice(0,88):''} imageUrl= {garlic.urlToImage} newsUrl={garlic.url} author={garlic.author} date={garlic.publishedAt}source={garlic.source.name}/>
                    </div>
                })}            
                </div>
                <div className="container d-flex justify-content-between my-3">
                    <button disabled={this.state.page<=1} type="button" className="btn btn-info" onClick={this.handlePreClick}>&larr; Previous</button>
                    <button disabled={ this.state.page+1 > Math.ceil(this.state.totalData/this.props.pageSize)} type="button" className="btn btn-info" onClick={this.handleNextClick}>Next &rarr; </button>
                </div>
            </div>
        )
    }
}

export default News
