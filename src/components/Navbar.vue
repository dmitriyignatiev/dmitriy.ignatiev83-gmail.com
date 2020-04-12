<template>
<nav id="nav">
    <ul>
        <div v-for="(friend, index) in friends" :key='index'>
            <span>{{friend.name}}</span>

            

        </div>

                            <h1 @click="changeTitle">{{title}}</h1>

        <h1>this is the props from App vue: {{msg}}</h1>
        <input type="text" :value="msg" @input="changeMessage"/>
        <span >{{messages}}</span>

        


        <select v-model="selected">
                <option v-for="(ch, index) in op" :key="index" v-bind:value="ch.value">{{ch.text}}</option>
            </select>
     <span>Выбрано: {{selected}}</span>
    </ul>
    
</nav>
    
</template>

<script>

import {bus} from '../main'

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

            title:"Previous title"
        }
    },
    methods:{
        changeMessage(event){
            this.messages=event.tagret.value;
            // this.$emit('messagedChanged', this.message)
        },
        changeTitle(){
            this.title="NewTitle"
            // this.$emit('changeTitle', 'Я тут')
            this.title = 'Я тут'
            bus.$emit("titleChanged", 'Я тут')
        }
        
    }

}
</script>

<style>

nav{
    text-align: "center";
}

nav ul{
    padding: 0;
    display: inline-block;
    list-style-type: none;
    margin: 0;
}

#nav {
  height: 150px;
  width: 100%;
  
}

</style>