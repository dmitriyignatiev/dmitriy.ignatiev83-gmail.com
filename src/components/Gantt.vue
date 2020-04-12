{{ src/components/Gantt.vue }}

<template>
    <div ref="gantt">
        
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
            filter_n:"test1"
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
        bus.$on('titleChanged', (data) => {
            console.log(data)
            this.filter_n = data
        
         gantt.config.root_id = "root";
// add ru
//add dropbox ta link task to a subclass
    gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"parent", type:"parent", allow_root:"true", root_label:"No parent"}, 
    {name:"time", height:72, type:"time", map_to:"auto"}
];
    gantt.locale.labels["section_parent"] = "Parent task";

  gantt.config.columns = [
    {name:"wbs", label:"WBS", width:40, template:gantt.getWBSCode }, 
    {name:"text", label:"Task name", tree:true, width:170 },
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
           
            
            // let dd = [
            //         {id:1, text:"Project #2", start_date:"01-04-2013", duration:18},
            //         {id:2, text:"Task #1",    start_date:"02-04-2013", duration:8,
            //             progress:0.6, parent:1},
            //         {id:3, text:"Task #2",    start_date:"11-04-2013", duration:8,
            //             progress:0.6, parent:1}]

            

            // g({data:[{id:1, text:"Project #2", start_date:"01-04-2013", duration:18},
            //         {id:2, text:"Task #1",    start_date:"02-04-2013", duration:8,
            //             progress:0.6, parent:1},
            //         {id:3, text:"Task #2",    start_date:"11-04-2013", duration:8,
            //             progress:0.6, parent:1}]});
            
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
    {name:"parent", type:"parent", allow_root:"true", root_label:"No parent"}, 
    {name:"time", height:72, type:"time", map_to:"auto"}
];
    gantt.locale.labels["section_parent"] = "Parent task";

  gantt.config.columns = [
    {name:"wbs", label:"WBS", width:40, template:gantt.getWBSCode }, 
    {name:"text", label:"Task name", tree:true, width:170 },
    {name:"start_date", align:"center", width: 90},
    {name:"end_date",label:"end_date", align:"center", width: 90},
    {name:"duration", align:"center", width: 60},
    {name:"add", width:40}
];

    gantt.init(this.$refs.gantt);


  
    
   
// track changes      http://localhost:8081/

        // const dd = this.$http.get("http://localhost:3000/data").then((response)=>console.log(typeof(response)))
        // console.log('dsads' + dd)
        
        // axios.get('http://localhost:3000/data').then(response => console.log(response.data))
        // const dd = axios.get('http://localhost:3000/data').then(response => console.log(response.data))
        // console.log("this is dd" + dd)
        // const test = {"data": dd}
        // console.log("trgfg" + test)
        
        
        
        // gantt.parse(this.$props.tasks); 
        

        
        this.$http.get("http://localhost:3000/data").then((response)=>{
            console.log(response)
            const new_response = response.body.find(record => record.contruction_object.name === this.filter_n)
            console.log(new_response)
            const new_list = []
            new_list.push(new_response)
            console.log(new_list)

            gantt.parse({data:new_list});
            
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


        

    }
    
}

</script>

<style>
    @import "~dhtmlx-gantt/codebase/dhtmlxgantt.css";
</style>