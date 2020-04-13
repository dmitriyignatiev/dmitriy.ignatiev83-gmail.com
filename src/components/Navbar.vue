<template>
<nav id="nav">
    <ul>
        <div v-for="(friend, index) in friends" :key='index'>
            <span>{{friend.name}}</span>

            

        </div>
         
        <h3>Создать объект строительства</h3>

        <form action="" v-on:submit.prevent>
            <input type="text" v-model="new_object">
            <input type="submit" value="Записать" v-on:click="submit" />
        </form>

        <h4>Выбрать объект строительства</h4>
        <!-- <input type="text" :value="msg" @input="changeMessage"/> -->
        <span >{{messages}}</span>


        <select v-model="selected" @change="onChange($event)">
                <option v-for="(obj, index) in constr_object" :key="index"  v-bind:value="obj">{{obj}}</option>
            </select>
     <span>Выбрано: {{selected}}</span>
    </ul>
    
</nav>
    
</template>

<script>

import {bus} from '../main'
import axios from "axios";
export default {
    name: 'Navbar',
    props:['friends', 'options', 'opt', "msg"],
    data(){
        return{
            selected:"",
            post:{
                optio:''
            },
            op:[
                { text: 'Один', value: 'А' },
                { text: 'Два', value: 'Б' },
                { text: 'Три', value: 'В' }
            ],
            messages: "",

            title:"Previous title",

            constr_object:[],
            new_object:""
                
        }
    },

    created(){

        this.$http.get("http://localhost:3500/data").then((response)=>{
            console.log("Navbar   ", response.data)
            for(let i=0; i<response.data.length; i++){
                this.constr_object.push(response.data[i].name)
            }
            
        })
        
    

    },

  



    methods:{
        changeMessage(event){
            this.messages=event.tagret.value;
            // this.$emit('messagedChanged', this.message)
        },
        changeTitle(){
            this.title="NewTitle"
            // this.$emit('changeTitle', 'Я тут')
            this.title = ''
            bus.$emit("titleChanged", this.title)
        },

        onChange(event) {
            
            console.log(event.target.value)
            this.title = event.target.value
            bus.$emit("titleChanged", this.title)
        },

        submit(){
            console.log(this.new_object)
            const res = axios.post(`http://localhost:3500/data`, {
                name:this.new_object
               
            })
            console.log(res) 
            this.constr_object.push(this.new_object)
            this.new_object=""

        }
        
    }

}
</script>

<style>

nav{
    text-align: "center";
}

nav ul{
    padding: 200;
    display: inline-block;
    list-style-type: none;
    margin: 200;
}

#nav {
  height: 250px;
  width: 100%;
  
}

</style>