import React from "react";
import star from '../../images/star.svg'
import itemline from '../../images/itemline.svg'
import binance from '../../images/binance.svg'
import filtericonl from '../../images/filtericonl.svg'
import filtericonr from '../../images/filtericonr.svg'
import { useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
const Items = (props) => {
    // const navigate = useNavigate()
    // const item = ((id) =>{
    // navigate(`/item2/${id}`)
    // console.log("ghhj",item)
    // })

    // const newTo = {
    //   pathname:"/item2/"+ props.ItemsData.id
    // }
  
  return (
    <>
     
          <Link to={`/item2/${props.ItemsData.id}`}>
          <div className="itembx" 
          // onClick=
          // {()=> item(props.ItemsData.id)
          // }
          >
            <div className="itemimg">
              <img src={props.ItemsData.image} />
            </div>
            <div className="itembox-hding">
              <img src={filtericonl} />
              <div className="star">
                <img src={star} />
              </div>
              <img src={filtericonr} />
            </div>
            <div className="itemline">
              <img src={itemline} />
            </div>
            <div className="box-btm">
              <div className="box-btm-l">
                <p>{props.ItemsData.p}</p>
                <h3>{props.ItemsData.name}</h3>
              </div>
              <div className="box-btm-r">
                <p>{props.ItemsData.title}</p>
                <h3>
                  <span>
                    <img src={binance} />
                  </span>
                  {props.ItemsData.price}
                </h3>
              </div>
            </div>
          </div>
          </Link>
        
     
    </>
  );
};

export default Items;
