import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export class NewsItem extends Component {

    render() {
        let {title,description,imageUrl,newsUrl,author,date,source} = this.props;
        // const title = this.props.title;
        // const description = this.props.description;
        // const imageUrl = this.props.imageUrl;
        // const newsUrl = this.props.newsUrl;
        // const date = this.props.date;
        return (
            <div className='my-3'>
                <div className="card">
                    <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left : '90%', zIndex :'1'}}>
                        {source}
                    </span>
                    {
                        imageUrl ? <img src={imageUrl} className="card-img-top" alt="..."/> : <img src='https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/60422/breaking-news-clipart-xl.png' className="card-img-top" alt="..."/>
                    }
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {!author?"unknown":author} on  {new Date(date).toGMTString()}</small></p>
                        <a href= {newsUrl} target="_blank"  className="btn btn-primary btn-sm">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
