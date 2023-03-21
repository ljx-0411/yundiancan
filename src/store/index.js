import { createStore } from 'vuex'
import { get, post, post_json } from "../utils/axios";
import { Toast } from "vant";
import { onSave } from '../views/PathAbout';
import register from './register'
import router from '../router'

export default createStore({
    state: {
        cart: {}, //购物车（共享）
        cart_list: [], //购物车数组
        sum: 0,
        user_info: {}, //如果把数据放在仓库，操作数据时需要提供操作该数据的方法
        productCategoryList: [],
        list: [],
        usermsg: [],
        temp: {
            // id: null,
            page: 1,
            pageSize: 9,
            username: null,
        },
        address: undefined,
        productMessage: null,
        // $router:$router
      sub_address:null


    },
    mutations: {
        SET_USER_INFO(state, data) { //cooidkie获取
            // cookie.set('id', data.id)
            sessionStorage.setItem('id', data.id)
            // sessionStorage.setItem('token',token)
            sessionStorage.setItem('username', data.username)
            state.user_info = data //可用的
            // state.temp.id=sessionStorage.getItem('id')
            state.temp.username=sessionStorage.getItem('username')
            // console.log(state.temp);
          
        },
        getMsg(state) { //获取当前用户信息
            get("/baseUser/pageQuery", state.temp).then((res) => {
                // console.log(res);
                res.data.list.forEach((item) => {
                    // console.log(item);
                    state.usermsg = item;
                });
                // console.log(state.usermsg);
            });
        },

        clearCart(state) {
            state.cart = {}
            state.cart_list = []
            state.sum = 0
        },
        getProduct(state) {
            //获取所有商品
            get("/product/pageQuery", { page: 1, pageSize: 9999 }).then((res) => {
                // console.log(res);
                res.data.list.forEach((item, key) => {
                    res.data.list[key].num = 0;
                });
                state.list = res.data.list;
            });
        },
        onSave(content) {//新增地址
            // console.log(content);
            var addressdata = {
              userId: sessionStorage.getItem("id"),
              realname: content.name,
              telephone: content.tel,
              province: content.province,
              city: content.city,
              address:
                content.province +
                " " +
                content.city +
                " " +
                content.county +
                " " +
                content.addressDetail,
              isDefault: Number(content.isDefault),
            };
            // console.log(data.isDefault);
            post("/app/address/saveOrUpdate", addressdata).then((res) => {
              console.log(res);
              if (res.status == 200) {
                Toast.success("保存成功！");
              }
            });
            this.getAddress()
          },
        getAddress(state) {
            //获取当前用户地址信息
            // console.log(this.usermsg.id);
            var address = [];
            var id = Number(state.temp.id)
            get("/app/address/queryByUserId", { userId: id }).then((res) => {
                res.data.forEach((item) => {
                    var a = {};
                    a.id = item.id;
                    a.name = item.realname;
                    a.tel = item.telephone;
                    a.address = item.address;
                    a.isDefault = true;
                    address.push(a);
                });
            });
            state.address = address;
        },
        onSubmit(state) {
            //提交订单
            var arr = []; //购物车里的商品提交到这里
            state.cart_list.forEach((item) => {
                var o = {};
                o.productId = item.id;
                o.price = item.price;
                o.num = item.num;
                arr.push(o); //将o对象里的购物车列表  的商品提交arr数组里
            });
            var data = {
                addressId: state.addressId, //获取用户选择地址id
                buyerMessage: "这是一个订单", //填写一个备注
                customerId: sessionStorage.getItem("id"),
                orderLines: arr,
                address: state.address
            };
            console.log(data.address);
            post_json("/app/order/submitOrder", data).then((res) => {
                if (res.status == 200) {
                    // this.clearCart(); //提交后清空购物车
                    state.cart = {}
                    state.cart_list = []
                    if (state.sum != 0)
                        state.sum = 0;
                    Toast.success("提交成功！");
                }
            });
        },
        addCart(state, item) {
            //加入购物车
            if (item.num == 0) { //优化当数量为0时，删除那一项
                state.cart = {}
                state.cart_list.splice(state.cart_list[item.id], 1)
                state.sum = state.sum - item.price * 100
            }
            state.sum = 0;
            state.cart[item.id] = item;
            state.cart_list = []
            for (var i in state.cart) {
                state.sum += state.cart[i].price * state.cart[i].num * 100; //购物车价格
                state.cart_list.push(state.cart[i]) //将商品添加到购物车

            }
            // console.log(state.cart);
        },
        getproductCategory(state) {
            //获取产品分类
            get("/productCategory/pageQuery", { page: 1, pageSize: 9999 }).then(
                (res) => {
                    // console.log(res);
                    state.productCategoryList = res.data.list;
                }
            );
        },
        message_list(state, id) {
            var param = {
                id: id
            }
            get('/app/product/queryProductDetails', param).then((res) => {
                console.log(res.data);
                state.productMessage = res.data
                router.push("/Product_message");
                // console.log(this.$router);
            })
        }
    },
    actions: {


    },
    modules: {
        register,

    }
})