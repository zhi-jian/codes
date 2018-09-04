import Vue from 'vue';
import axios from 'axios'
import Vuex from 'vuex';
import { resolve } from 'url';
Vue.use(Vuex);
const state = {
    lists:[],
    skip:1,
    curPage:1,
    totalPage:1,
    busy:false,
    isBottom:false,
    categoryList:[],
    themeList:[],
    isEmpty:true
};

const mutations = {
   getList(state,data){
       state.lists=data.product;
       state.curPage=data.pages.curPage;
       state.totalPage=data.pages.totalPage;        
       state.categoryList=data.category_list;        
       state.themeList=data.theme_list;        
   },
   loadMore(state,data){
       state.skip+=1
       state.lists=state.lists.concat(data)
   }
};

const actions = {
    getList(context,url){
        function getData(){
            return new Promise(function(resolve,rejects){
                axios.get(url+'&page='+state.skip).then(res=>{
                    resolve(res)
                })
            })
        }
        getData().then(data=>{
            // console.log(data)
            if(!data.data.product||data.data.product.length<=0){
                state.isEmpty = false;
                state.isBottom = false
            }else{
                state.isEmpty = true;
                state.isBottom = true
            }
            context.commit('getList',data.data)
        })
    },
    loadMore(context,url){
        function getData(){
            return new Promise(function(resolve,rejects){
                if(state.curPage<state.totalPage){
                    state.busy=true
                    axios.get(url+'&page='+state.skip).then(res=>{
                        resolve(res)
                    })
                }else if(state.curPage>=state.totalPage){
                    state.isBottom=true
                }
            })
        }
        getData().then(data=>{
            // console.log(data)
            context.commit('loadMore',data.data)
            state.busy=false
        })
    }
};

export default {
    state,
    mutations,
    actions
}