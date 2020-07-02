import * as api from '../services'
export default {

    namespace: 'product',
  
    state: {
        products:[],
        initData:[],
        filtedData:[]
    },
   
  
    effects: {
      *initProduct({ payload }, { call, put }) {  // eslint-disable-line
        const res = yield call(api.getProducts,payload);
        // console.log("yield",res)
        const data = res.data.products
        // console.log("yield asasas",data)
        // console.log("sasas",data.data)
        if(data){
          yield put({ 
            type: 'updateProduct' ,
            data:data
            // products
          });
          yield put ({
            type: 'initData',
            data:data
          })
        }
      },
    },
  
    reducers: {
      updateProduct(state, payload) {
        return { ...state, products:payload.data};
      },

      // 尺码筛选
      filtData(state, {payload:{key}}){
        const data = state.initData
        // console.log("initdata",data)
        const size = key.key;
        // console.log(data,"size",size)
        let newList = []
        if(size==='ALL'){
          newList=data
        }
        if (size && data) {
          data.forEach(item => {
            if (item.availableSizes.indexOf(size)!==-1) {
              // console.log("筛筛筛筛")
              newList.push(item)
            }
          })
        }
        // payload=newList
        // console.log("筛",newList)
        return{
          ...state,
          products: newList,
          filtedData: newList
        }
      },
// 价格排序
      sortData(state, {payload:{key}}){
        const data = state.filtedData
        // console.log("sort",data)
        // console.log(typeof key)
        let sortList = []
        // const currentkey = key.key
        if(key==='1' && data){
          sortList = data.sort((a, b) => (a.id - b.id))
        }
        if(key==='2' && data){
          sortList = data.sort((a, b) => (a.price - b.price))
        }
        if(key==='3' && data){
          sortList = data.sort((a, b) => (b.price - a.price))
        }
        console.log("排序的",sortList)
        return{
          ...state,
          products: [...sortList],
        }
      }, 
      initData(state, payload) {
        return {
          ...state,
          initData: payload.data,
          filtedData: payload.data
        }
      },
    
    },
    
  
  };

  // function deepClone(arr){
  //   let _obj = JSON.stringify(arr),
  //     objClone = JSON.parse(_obj);
  //   return objClone; 
  // }
  