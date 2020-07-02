import React,{Fragment} from 'react';
import { connect } from 'dva';
import { Layout ,Menu, Drawer, Button,Row, Col,Badge ,Spin,Modal } from 'antd';//Dropdown,
// import { DownOutlined } from '@ant-design/icons';
import ProductView from '../ProductView'
import Cart from '../Cart'



class App extends React.Component {

  constructor(){
    super()
    this.state={
      visible:false
    }
  }
  componentWillMount = () => {
    console.log("存了没",window.localStorage,this.props.cart.addedProductList)
    const { dispatch } = this.props
    // console.log("存了没121212121",this.props.cart.addedProductList,"对比",window.localStorage.addedProductList)
    dispatch({
      type: 'cart/localStorage'
    })
  }
  
  // 筛选
  
  filtBySize = (key) => {
    const { dispatch } = this.props
    dispatch({
      type: 'product/filtData',
      payload: {
        key
      }
    })
  }

  pay = async() => {
    let secondsToGo = 5;
    const {totalPrice}=this.props.cart;
    const { dispatch } = this.props
    await dispatch({
      type: 'cart/paying',
    })
    setTimeout(() => {
      dispatch({
        type: 'cart/pay',
      })
      const modal = Modal.success({
        title: `已经成功结算$${this.formatPrice(totalPrice)}`,
        content: `本提示将在 ${secondsToGo} 秒后自动关闭.`,
      });
      const timer = setInterval(() => {
        secondsToGo -= 1;
        modal.update({
          content: `本提示将在 ${secondsToGo} 秒后自动关闭.`,
        });
      }, 1000);
      setTimeout(() => {
        clearInterval(timer);
        modal.destroy();
      }, secondsToGo * 1000);
    }, 3000);
  }


    showDrawer = () => {
      this.setState({
        visible:true
      })
    };
  
    onClose = () => {
      this.setState({
        visible:false
      })
    };

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
                  return s1+"."+s2.slice(0,2)
          }
      }else {
          return pri+'.00';
      }   
  }

  filtByPrice = ({ key }) => {
    // this.setAttribute('disabled')
      // message.info(`Click on item ${key}`);
      const {dispatch } = this.props
      dispatch({
        type: 'product/sortData',
        payload: {
          key
        }
      })
    }

  render () {
    console.log("验证是否存入",window.localStorage)
    // window.localStorage.clear()
    const { Header, Content ,Footer} = Layout;
    const {totalNum,totalPrice,loading}=this.props.cart;
    // const sizemenu = (
    //   <Menu onClick={this.filtBySize} trigger='hover'>
    //     <Menu.Item key="ALL">所有尺码</Menu.Item>
    //     <Menu.Item key="S">S</Menu.Item>
    //     <Menu.Item key="M">M</Menu.Item>
    //     <Menu.Item key="L">L</Menu.Item>
    //     <Menu.Item key="XL">XL</Menu.Item>
    //     <Menu.Item key="XXL">2XL</Menu.Item>
    //   </Menu>
    // );
    // const pricemenu = (
    //   <Menu onClick={this.filtByPrice} trigger='hover' style={{"marginLeft":'20px'}}>
    //     <Menu.Item key="1">综合排序</Menu.Item>
    //     <Menu.Item key="2">价格升序</Menu.Item>
    //     <Menu.Item key="3">价格降序</Menu.Item>
    //   </Menu>
    // );
    
    const cartfooter = (
        <Layout>
            <Footer>
                <p>总价:<span style={{'float':'right'}}>${this.formatPrice(totalPrice)}</span></p>
                <p>数量:<span style={{'float':'right'}}>{totalNum}</span></p>
                <Spin spinning={loading} delay={100}><Button type="primary" block onClick={this.pay} disabled={totalPrice===0 || loading===true}>结算</Button></Spin>
            </Footer>
        </Layout>
    )
  // const [visible, setVisible] = useState(false);

  const { SubMenu } = Menu;

  return (
<Fragment>
          <Layout>
                <Header style={{"backgroundColor":'#ccc'}}>
                  <Row>
                      <Col span={23}>
                        <Menu mode="horizontal" style={{"backgroundColor":'#ccc'}}>
                          <SubMenu onClick={this.filtBySize} trigger='hover' title="尺码选择">
                            <Menu.Item key="ALL">所有尺码</Menu.Item>
                            <Menu.Item key="S">S</Menu.Item>
                            <Menu.Item key="M">M</Menu.Item>
                            <Menu.Item key="L">L</Menu.Item>
                            <Menu.Item key="XL">XL</Menu.Item>
                            <Menu.Item key="XXL">2XL</Menu.Item>
                          </SubMenu>
                          <SubMenu onClick={this.filtByPrice} trigger='hover' style={{"marginLeft":'20px'}} title="价格排序">
                            <Menu.Item key="1">综合排序</Menu.Item>
                            <Menu.Item key="2">价格升序</Menu.Item>
                            <Menu.Item key="3">价格降序</Menu.Item>
                          </SubMenu>
                        </Menu>
                          {/* <Dropdown overlay={sizemenu}>
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>尺码选择 <DownOutlined /></a>
                          </Dropdown>
                          <Dropdown overlay={pricemenu} >
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()} style={{"marginLeft":'20px'}}>价格排序 <DownOutlined /></a>
                          </Dropdown> */}
                      </Col>
                      <Col span={1}>
                        <Badge count={totalNum} style={{}}>
                          <Button type="primary" trigger="hover" onClick={this.showDrawer}>购物车</Button>
                        </Badge>
                      </Col>
                  </Row>
                </Header>
                <Layout>
                  <Content style={{ padding: '0 180px' }}><ProductView/>
                  </Content>
                </Layout>
                <Drawer
                  title="购物车"
                  placement="right"
                  closable={true}
                  onClose={this.onClose}
                  visible={this.state.visible}
                  destroyOnClose='false'
                  width='400px'
                  // getContainer={'body'}
                  footer={cartfooter}
                >
                  <Cart/>
                </Drawer>
              </Layout>
      </Fragment>
  )
  
}
}









const mapStateToProps = (state) => {
    // console.log('state的',state)
    // console.log(state.product.products.payload)
    return {
        products:state.product.products,
        cart:state.cart
    } 
}

export default connect(mapStateToProps)(App);