export default {

    namespace: 'cart',
  
    state: {
        addedProductList:[],
        totalNum:0,
        totalPrice:0,
        loading:false
    },
  
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
      },
    },
  
    effects: {
      // *fetch({ payload }, { call, put }) {  // eslint-disable-line
      //   yield put({ type: 'save' });
      // },
      *localStorage({ payload }, { put }) {
        //给我存
        yield put({
          type: 'setLocalStorage',
          currentdata: {
            _addedProductList: window.localStorage.addedProductList?JSON.parse(window.localStorage.addedProductList):[],
            _totalNum: window.localStorage.totalNum?window.localStorage.totalNum:0,
            _totalPrice: window.localStorage.totalPrice?window.localStorage.totalPrice:0,
            }
        });


    },

    
  },
  
    reducers: {
      // 加购
      addToCart(state, {payload:{currentItem,currentSize}}) {
        // console.log("连接了没",copyCart,currentTotal)
        // console.log('页面取值',currentItem,currentSize)
        const { addedProductList } = state
        // const { data, size } = payload.payload
        let key = 0;
        let totalNum = 0
        let totalPrice = 0
        addedProductList.forEach(item => {
          if (item.id === currentItem.id && item.size === currentSize) {
            item.num += 1;
          }
          else {
            key++
          }
          totalNum += item.num
        })
        if (addedProductList.length === key) {
          addedProductList.push({
            ...currentItem,
            num: 1,
            size: currentSize
          })
          totalNum += 1
        }
        console.log("当前购物车数据", addedProductList,totalNum,totalPrice);
        addedProductList.forEach(item => {
          totalPrice = totalPrice + item.price * item.num
        })
        // 存入local
        const storage = window.localStorage
        let _addedProductList = JSON.stringify(addedProductList)
        let _totalNum = totalNum
        let _totalPrice = JSON.stringify(totalPrice)
        storage.setItem("addedProductList",_addedProductList)
        storage.setItem("totalNum",_totalNum)
        storage.setItem("totalPrice", _totalPrice)


        return { 
          ...state,
          addedProductList,
          totalNum,
          totalPrice,
          loading:false
        };
      },
      // 购物车内改变数量
      changeItemNum(state, {payload:{flag,currentId,currentSize}}) {
      // console.log('chufa')
      const { addedProductList } = state
      let totalNum = 0
      let totalPrice = 0
      // console.log('flag',flag,currentId,currentSize)
      addedProductList.forEach(item => {
        if (item.id === currentId && item.size === currentSize) {
          console.log('jinlai')
          if(flag==='increment'){
            item.num++;
            // console.log('+++',item.num)
          }
          if(flag==='decrement'){
            item.num --
          }
        }
        totalNum += item.num
      })
      addedProductList.forEach(item => {
        totalPrice = totalPrice + item.price * item.num
      })

       // 存入local
        // 存入local
        const storage = window.localStorage
        let _addedProductList = JSON.stringify(addedProductList)
        let _totalNum = totalNum
        let _totalPrice = JSON.stringify(totalPrice)
        storage.setItem("addedProductList",_addedProductList)
        storage.setItem("totalNum",_totalNum)
        storage.setItem("totalPrice", _totalPrice)
      return {
        ...state,
        addedProductList,
        totalNum ,
        totalPrice,
        loading:false
      }
      },
      // 移除
      removeItem(state, {payload:{currentId,currentSize}}) {
        const { addedProductList ,totalNum} = state
        let totalPrice = 0
        let currentTotalNum = totalNum
        // console.log('flag',flag,currentId,currentSize)
        addedProductList.forEach(item => {
          if (item.id === currentId && item.size === currentSize) {
            console.log('shanchu')
            let i =addedProductList.indexOf(item.id)
            addedProductList.splice(i,1)
            currentTotalNum -= item.num
          }
          
        })
        addedProductList.forEach(item => {
          totalPrice = totalPrice + item.price * item.num
        })
        // 存入local
        const storage = window.localStorage
        let _addedProductList = JSON.stringify(addedProductList)
        let _totalNum = currentTotalNum
        let _totalPrice = JSON.stringify(totalPrice)
        storage.setItem("addedProductList",_addedProductList)
        storage.setItem("totalNum",_totalNum)
        storage.setItem("totalPrice", _totalPrice)
        return {
          ...state,
          addedProductList,
          totalNum:currentTotalNum ,
          totalPrice,
          loading:false
        }
        },
        paying(state,{payload}) {
          return {
            ...state,
            loading:true
          }
        },
        // 结算
        pay(state,{payload}) {
          const storage = window.localStorage
          let _addedProductList = []
          let _totalNum = 0
          let _totalPrice = 0
        // 存入local
        storage.setItem("addedProductList",_addedProductList)
        storage.setItem("totalNum",_totalNum)
        storage.setItem("totalPrice", _totalPrice)
          return {
            ...state,
            addedProductList:[],
            totalNum:0,
            totalPrice:0,
            loading:false
          }
          
        },
        // setLocalStorage
        setLocalStorage(state, { currentdata }) {
          console.log("测试测试测试modelceshi",currentdata)
          return {
            ...state,
            addedProductList: currentdata._addedProductList,
            totalNum: currentdata._totalNum,
            totalPrice: currentdata._totalPrice
          }
        },

      
    },
  
  };
  