import React from 'react';
import twitter from '../images/twitter.svg'
import facebook from '../images/facebook.svg'
import insta from '../images/insta.svg'
import youtube from '../images/youtube.svg'
import filtericonl from '../images/filtericonl.svg'
import filtericonr from '../images/filtericonr.svg'


function Footer() {

    return (
        <div>

            <div className='fotterbg'>
                <div className='container-fluid'>
                    <div className='ftr-hding'>
                        <h1>FIND <span>ARENA LEGENDS</span> ON SOCIAL MEDIA</h1>
                    </div>

                    <ul className='socialicon'>
                        <li>
                            <div className='f-img-l'>
                                <img src={filtericonl} />
                            </div>
                        </li>
                        <li><a href='#'><img src={twitter} /></a></li>
                        <li><a href='#'><img src={facebook} /></a></li>
                        <li><a href='#'><img src={insta} /></a></li>
                        <li><a href='#'><img src={youtube} /></a></li>
                        <li>
                            <div className='f-img-r'>
                                <img src={filtericonr} />
                            </div>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    );
}


export default Footer;