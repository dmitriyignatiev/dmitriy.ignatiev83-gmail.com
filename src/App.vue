{{ src/App.vue }}
<template>
  <div class="container">
  <Navbar   :options="options" :opt="opt" 
 
  :msg="message"
  @messageChanged="message= $event"
  v-on:changeTitle="updateTitle($event)"/>
    <div class="right-container">
      <div class="gantt-selected-info">
        <div v-if="selectedTask">
          <h2>{{selectedTask.text}}</h2>
          <span><b>ID: </b>{{selectedTask.id}}</span><br/>
          <span><b>Progress: </b>{{selectedTask.progress|toPercent}}%</span><br/>
          <span><b>Start Date: </b>{{selectedTask.start_date|niceDate}}</span><br/>
          <span><b>End Date: </b>{{selectedTask.end_date|niceDate}}</span><br/>
        </div>
        <div v-else class="select-task-prompt">
          <h2>Click any task</h2>
        </div>
      </div>
      <ul class="gantt-messages">
        <li class="gantt-message" v-for="(message, index) in messages" v-bind:key="index">{{message}}</li>
      </ul>
    </div>
    <gantt class="left-container" :tasks="tasks" 
      @task-updated="logTaskUpdate"
      @link-updated="logLinkUpdate" 
      @task-selected="selectTask">
    </gantt>
  </div>
</template>
 
<script>

import Gantt from './components/Gantt.vue';
import Navbar from './components/Navbar.vue';

import axios from "axios";

import {bus} from './main'

export default {
  name: 'app',
  components: {
    Gantt,
    Navbar,

    },

  data () {
    return {

      friends:[
        {name: "Dima"},
         {name: "Olya"},
      ],
      options:[
        {name: "One"},
        {name: "Two"}

      ],

      opt:'',

      tasks: {
       
        data: [
        ],
        delete_task:[{id: 5, text: 'Task 1 ', start_date: '2020-03-25', duration: 2, progress:0.2}],
        links: [
         
        ]
      },
      selectedTask: null,
      messages: [],

      filter_n:"",

      message: "this is a message",
      title:""
    }


  },

  filters: {
    toPercent (val) {
      if (!val){
        return '0'
      }
      return Math.round((+val) * 0.1)
    },
    niceDate (obj){
      return `${obj.getFullYear()} / ${obj.getMonth() + 1} / ${obj.getDate()}`
    }
  },

 async created(){
    try{
      const res = await axios.get(`http://localhost:3000/data`);
      
      console.log("typeof" + typeof(res))
      this.tasks.data = res.data;
      console.log("axios" + res.data)


    } catch(e){
      console.error(e);
    }

    bus.$on('titleChanged', (data) => {
            console.log(data)
            this.filter_n = data

  })
 },

  methods: {

    updateTitle:function(updated){
      this.filter_task = updated
    },

    // updateTitle(updatedTitle){
    //   this.filter_task = updatedTitle
    // },

    async addTaskNew(newTask){
      const res = await axios.post(`http://localhost:3000/data`,
       {text: newTask.text})
        console.log(res)
      
    },


    // for testing purpose only
    AddTask(task)
    {
      var taskId ={
              id:10,
              text:"test_project",
              start_date:"2020-01-20",
              duration:28}
      alert(taskId)
      this.tasks.data.push(taskId)
      let text = (task && task.text ? ` (${task.text})`: '')
      console.log(text)

    },

   

    addMessage (message) {
      this.messages.unshift(message)
      if (this.messages.length > 40) {
        this.messages.pop()
      }
    },
 
    logTaskUpdate (id, mode, task) {
      let text = (task && task.text ? ` (${task.text})`: '')
      let message = `Task ${mode}: ${id} ${text}`
      this.addMessage(message)

      
      
      // console.log(`${task.text} id:${task.id}`)
      console.log(mode + ' ' + id)
      
      if(mode=='create'){

        
        

        this.tasks.data.push({text:`${task.text}`,
                           id: `${task.id}`, 
                           duration:`${task.duration}`,
                           parent: "root",
                           })
        const res = axios.post(`http://localhost:3000/data`,
       {
         id: `${task.id}`,
         text: `${task.text}`, 
         start_date: `${task.start_date}`,
         end_date: `${task.end_date}`,
         progress: `${task.progress}`,
         duration:`${task.duration}`,
         
      "open": true,
      "resources": [
        {
          "name": ""
        }
      ],
      "contruction_object": {
        "id": "",
        "name": this.filter_n ,
        "coordinates": "",
        "attribute": {
          "basicPoints": {
            "name": "",
            "coordinates": ""
          },
          "headquarters": {
            "name": "",
            "manager": ""
          },
          "contracts": [
            {
              "number": "",
              "price": "",
              "data": "",
              "suppliers": [
                {
                  "name": "",
                  "contacts": "",
                  "manager": ""
                }
              ]
            }
          ],
          "performing_work": {
            "name": "",
            "description": "",
            "date_start": "",
            "date_end": "",
            "suppliers": [
              {
                "name": "",
                "contacts": "",
                "manager": ""
              }
            ]
          }
        }
      }
    
       
       })
        
        console.log(res)

        
        
      }
      if(mode=='update'){
        // let my_dict = this.tasks.data
        console.log(`${task.text}`)
        console.log('this is index of task ' + ' ' + `${task.id}`)
        for (var i=0; i<this.tasks.data.length; i ++ ){
          if (this.tasks.data[i].id == `${task.id}`) {
          this.tasks.data[i].text = `${task.text}`
          this.tasks.data[i].start_date = `${task.start_date}`
          this.tasks.data[i].duration = `${task.duration}`
          this.tasks.data[i].end_date = `${task.end_date}`
          this.tasks.data[i].progress = `${task.progress}`
         
        }
        }
        axios.put('axios.put(`http://localhost:3000/data/2',
        {
          text:  `${task.text}`
         
        }
        )
        console.log("UPDATEEEEEE")
      }
      
      if(mode==="delete"){
        // console.log(`${task.id}`+ ' ' +  `${task.text}`)
          console.log('string')
          let tt = this.tasks.data.filter(t=>t.id!==`${task.id}`)
          this.tasks.data = tt
          axios.delete(`http://localhost:3000/data/` + `${task.id}`);
          

        
        
      }
      
    },

  
    logLinkUpdate (id, mode, link) {
      let message = `Link ${mode}: ${id}`
      if (link) {
        message += ` ( source: ${link.source}, target: ${link.target} )`
      }
      this.addMessage(message)
    },

    selectTask(task) {
      this.selectedTask = task
      console.log("select")
    },
  }
}
</script>

<style>
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  .container {
    height: 100%;
    width: 100%;
  }
  .left-container {
    overflow: hidden;
    position: relative;
    height: 100%;
  }
  .right-container {
    border-right: 1px solid #cecece;
    float: right;
    height: 100%;
    width: 340px;
    box-shadow: 0 0 5px 2px #aaa;
    position: relative;
    z-index:2;
  }
  .gantt-messages {
    list-style-type: none;
    height: 50%;
    margin: 0;
    overflow-x: hidden;
    overflow-y: auto;
    padding-left: 5px;
  }
  .gantt-messages > .gantt-message {
    background-color: #f4f4f4;
    box-shadow:inset 5px 0 #d69000;
    font-family: Geneva, Arial, Helvetica, sans-serif;
    font-size: 14px;
    margin: 5px 0;
    padding: 8px 0 8px 10px;
  }

  
</style>