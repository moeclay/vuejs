Vue.component('customercomponent',{
    template : '<div class = "Table"><div class = "Row"  v-bind:style = "styleobj"><div class = "Cell"><p>{{itr.fname}}</p></div><div class = "Cell"><p>{{itr.lname}}</p></div><div class = "Cell"><p>{{itr.addr}}</p></div><div class = "Cell"><p><button v-on:click = "$emit(\'removeelement\')">X</button></p></div></div></div>',
    props: ['itr', 'index'],
    data: function() {
       return {
          styleobj : {
             backgroundColor:this.getcolor(),
             fontSize : 20
          }
       }
    },
    methods:{
       getcolor : function() {
          if (this.index % 2) {
             return "#FFE633";
          } else {
             return "#D4CA87";
          }
       }
    }
});

var vm = new Vue({
    el: '#databinding',
    data: {
       fname:'',
       lname:'',
       addr : '',
       custdet:[
           {fname:'bill', lname: 'client', addr:'san autor'},
           {fname:'anim', lname: 'ola', addr:'san jose'},
           {fname:'marie', lname: 'duo', addr:'street five'}
       ],
       styleobj: {
          backgroundColor: '#2196F3!important',
          cursor: 'pointer',
          padding: '8px 16px',
          verticalAlign: 'middle',
       }
    },
    methods :{
       showdata : function() {
          this.custdet.push({
             fname: this.fname,
             lname: this.lname,
             addr : this.addr
          });
          this.fname = "";
          this.lname = "";
          this.addr = "";
       }
    }
});
