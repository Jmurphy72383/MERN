import React from 'react';
import './Landing.css';


const Landing = () => {

    // const [backgroundColor, setBackgroundColor] = useState({
    //     loaded: false
    // });

    // const { loaded } = backgroundColor;

    // useEffect(() => {
    //     pageLoaded()
    // },[]);

    // const pageLoaded = () => {
    //     setBackgroundColor({
    //         loaded: true
    //     })
    // }

    // const test = document.querySelector('body');

    // if(loaded == true) {
    //     test.style.backgroundColor = "white";
    // }

    

    return (

    <div className="landing-container">
        <div className="landing-item-header landing-header">
            <h1 className="landing-h1">Its Time to Invest...</h1>
            <h3 className="landing-h3">Your All In One Investing Dashboard</h3>
        </div>
        <div className="landing-item landing-news">
            <div className="heading-wrapper">
                <h2 className="landing-h2">Latest News</h2>
            </div>
        </div>
        <div className="landing-item landing-stocks">
            <div className="heading-wrapper">
                <h2 className="landing-h2">Live Market Data</h2>
            </div>
        </div>
        <div className="landing-item landing-port">
            <div className="heading-wrapper">
                <h2 className="landing-h2">Portfolio Tracking</h2>
            </div>
        </div>
        {/* <div className="landing-item landing-footer">footer</div> */}
    </div>
        
    )
}

export default Landing;
