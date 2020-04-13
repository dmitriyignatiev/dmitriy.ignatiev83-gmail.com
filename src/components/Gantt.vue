{{ src/components/Gantt.vue }}

<template>
    <div ref="gantt" id="gg">
        
    </div>
</template>

<script>

import {gantt} from 'dhtmlx-gantt';

// import axios from "axios"
import {bus} from '../main'

export default {
    name:'gantt',
    data(){
        return{
            filter_n:"Якорная будка"
        }
    },
    props:{
        tasks:{
            type: Object,
            default(){
                return {data: [], links: []}
            }
        }
    },

    created(){
        // bus.$on('titleChanged', (data) => {
        //     console.log(data)
        //     this.filter_n = data
        bus.$on('titleChanged', (data)=>{
            console.log("DATAddd", data)
            this.filter_n = data
        
 


         gantt.config.root_id = "root";
// add ru
//add dropbox ta link task to a subclass
    gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    // {name:"parent", type:"parent", allow_root:"true", root_label:"No parent"}, 
    {name:"time", height:72, type:"time", map_to:"auto"}
];
    gantt.locale.labels["section_parent"] = "Parent task";

  gantt.config.columns = [
    {name:"wbs", label:"WBS", width:40, template:gantt.getWBSCode }, 
    {name:"text", label:"Task name", tree:true, width:300 },
    {name:"start_date", align:"center", width: 90},
    {name:"end_date",label:"end_date", align:"center", width: 90},
    {name:"duration", align:"center", width: 60},
    {name:"add", width:40}
];

    gantt.init(this.$refs.gantt);

        
        this.$http.get("http://localhost:3000/data").then((response)=>{
            console.log(response)
             const new_list = []
            var new_response = response.body
            console.log(new_response)
            for(let i=0; i<10; i++){
                if (new_response[i].contruction_object.name===this.filter_n){
                   console.log(new_response[i])
                   new_list.push(new_response[i])
                   console.log("this.is new list ", new_list)
                   gantt.parse({data:new_list})

                }
                
            }
            
        });

        gantt.createDataProcessor((entity, action, data, id) => {
        this.$emit(`${entity}-updated`, id, action, data);

        gantt.attachEvent('onTaskSelected', (id) => {
        let task = gantt.getTask(id);
        this.$emit('task-selected', task);
});
 
       gantt.attachEvent('onTaskIdChange', (id, new_id) => {
       if (gantt.getSelectedId() == new_id) {
         let task = gantt.getTask(new_id);
         this.$emit('task-selected', task);
        }
     });
   });

      

        

    
        
        
        })
       

    }, 
    mounted:function(){
        // let recaptchaScript = document.createElement('script')
        // recaptchaScript.setAttribute('src', "./")
        // document.head.appendChild(recaptchaScript)
        

        gantt.config.xml_date ="%Y-%m-%d";
        gantt.config.scale_unit = "day";
        gantt.config.step = 1;
        gantt.config.date_scale = "%d";
        gantt.templates.task_text=function(start,end,task){
    return "<b>Text:</b> "+task.text+",<b> Holders:</b> "+task.users + task.progress;
};
        //for subclass
        gantt.config.root_id = "root";
// add ru
//add dropbox ta link task to a subclass
    gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    // {name:"parent", type:"parent", allow_root:"true", root_label:"No parent"}, 
    {name:"time", height:72, type:"time", map_to:"auto"}
];
    gantt.locale.labels["section_parent"] = "Parent task";

  gantt.config.columns = [
    {name:"wbs", label:"WBS", width:40, template:gantt.getWBSCode }, 
   
    {name:"text", label:"Task name", tree:true, width:300 },
    {name:"start_date", align:"center", width: 90},
    {name:"end_date",label:"end_date", align:"center", width: 90},
    {name:"duration", align:"center", width: 60},
    {name:"add", width:40}
];

    gantt.init(this.$refs.gantt);     
        
        // this.$http.get("http://localhost:3000/data").then((response)=>{
        //     console.log(response)
        //     const new_response = response.body.find(record => record.contruction_object.name === this.filter_n)
        //     console.log(new_response)
        //     const new_list = []
        //     new_list.push(new_response)
        //     console.log(new_list)

        //     gantt.load({data:new_list});
            
        // });

        gantt.createDataProcessor((entity, action, data, id) => {
        this.$emit(`${entity}-updated`, id, action, data);

        gantt.attachEvent('onTaskSelected', (id) => {
        let task = gantt.getTask(id);
        this.$emit('task-selected', task);
});
 
       gantt.attachEvent('onTaskIdChange', (id, new_id) => {
       if (gantt.getSelectedId() == new_id) {
         let task = gantt.getTask(new_id);
         this.$emit('task-selected', task);
        }
     });
   });


        

    }
    
}

</script>

<style>
    @import "~dhtmlx-gantt/codebase/dhtmlxgantt.css";
  
</style>