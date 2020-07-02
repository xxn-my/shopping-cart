import React from 'react';
import { connect } from 'dva';
import { Card,Col, Row,Popover,Button,List } from 'antd';

class ProductView extends React.Component {
    componentDidMount = () => {
        this.props.dispatch({
            type:'product/initProduct'
        })
        
    }
    formatPrice(price) {
        let pri = price.toString();
        if(pri.indexOf('.')!==-1){
            let s1 = pri.split('.')[0];
            let s2 = pri.split('.')[1];
            switch(s2.length){
                case 2:
                    return pri;
                    // break;
                case 1:
                    return pri+'0';
                    // break;
                default:
                    return s1+s2.slice(0,2)
            }
        }else {
            return pri+'.00';
        }   
    }
    addToCart = (currentItem, currentSize) => {
        this.props.dispatch({
            type:'cart/addToCart',
            payload:{
                currentItem,
                currentSize
            }
        })
    }
    render () {
        const { Meta } = Card;
        // console.log("即将12121",this.props)
        // console.log("即将12121223232",this.props.products)
        const {products} =this.props
        let li = '暂无数据'
        if(products!==undefined){
            li = products.map((ele,index)=>
            <Col span={6} key={index} style={{'marginTop':'20px'}}><Card hoverable={true} cover={<img alt="" src={`./images/${ele.sku}_1.jpg`} style={{padding: '5px 10px'}}/>}  style={{ borderRadius: "2%" ,textAlign:'center'}}>
            <Meta title={ele.title}/>
            <h3>{ele.currencyFormat + this.formatPrice(ele.price)}</h3>
            <Popover  
            content={
                 <List
                 size="small"
                //  bordered
                 dataSource={ele.availableSizes}
                 renderItem={item => <List.Item key={ele.id+item}><Button block onClick={()=>this.addToCart(ele, item)} >{item}</Button></List.Item>}
               />
            } 
            title="选择尺码" trigger="click">
              <Button type="primary">加入购物车</Button>
            </Popover>
            </Card>
            </Col>
            )
        }
        return (
            <div className="site-card-wrapper">
            <Row gutter={15} >{li}</Row>
          </div>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log('productview state的',state.product)
    // console.log(state.product.products.payload)
    return {
        products:state.product.products,
        addedProductList:state.cart.addedProductList
    } 
}


export default connect(mapStateToProps)(ProductView);