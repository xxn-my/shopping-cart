import React from 'react'
import {connect} from 'dva';
import { Button ,List, Avatar} from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

class Cart extends React.Component {
  changeItemNum = (flag,currentId, currentSize) => {
    const { dispatch } = this.props
     dispatch({
      type: 'cart/changeItemNum',
      payload: {
        flag,
        currentId,
        currentSize
      }
    })
  }
  


    removeItem = async (currentId, currentSize) => {
      const { dispatch } = this.props
      await dispatch({
        type: 'cart/removeItem',
        payload: {
          currentId,
          currentSize
        }
      })
    }
    render(){
      // const {addedProductList}=this.prop
      const {addedProductList}=this.props.cart
      // console.log("渲染购物车前sdfsdfsfsdfsdf",this.props,addedProductList)
      const ButtonGroup = Button.Group;
        return  (
            <div>
                <List
                  itemLayout="horizontal"
                  dataSource={addedProductList}
                  renderItem={item => (
                    // console.console.log(item.num)
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={`./images/${item.sku}_2.jpg`} />}
                        title={item.title}
                        description={item.size+'|' +item.style}
                      />
                      <ButtonGroup size='small'>
                        <Button onClick={()=>this.changeItemNum('decrement',item.id,item.size)} disabled={item.num === 1}><MinusOutlined /></Button>
                        <span style={{'margin':'0 5px'}}>{item.num}</span>
                        <Button onClick={()=>this.changeItemNum('increment',item.id,item.size)}><PlusOutlined /></Button>
                        <Button onClick={() => this.removeItem(item.id, item.size)} size='small'>X</Button>
                      </ButtonGroup>
                    </List.Item>
                  )}
                />
            </div>
        
            )
    }
}

const mapStateToProps = state => state
// const mapStateToProps = (state) => {
//     // console.log('g购物车state的',state)
//     // console.log(state.product.products.payload)
//     return {
//       // addedProductList:state.cart.addedProductList
//         cart:state
//     } 
// }
export default connect(mapStateToProps)(Cart)