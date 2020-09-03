Vue.component('todo', {
    template: '<div class="container">'+
        '<div class="row justify-content-center">'+
            '<div class="col-md-6">'+
                '<h1 class="text-center">Todolist</h1>'+
                '<hr>'+
                '<input type="text" class="form-control" placeholder="Input todolist & enter" v-model="todo.name" v-on:keyup.enter="addTodo">'+
                '<hr>'+
                '<ul class="list-group">'+
                    '<todo-item v-for="item,index in todos" v-bind:item="item" v-bind:key="index" v-on:toggleTodo="toggleTodo" v-on:deleteTodo="deleteTodo"></todo-item>'+
                '</ul>'+
            '</div>'+
        '</div>'+
    '</div>',
    data: function(){
        return {
            todos: [
                {name:'Todo 1', done: true},
                {name:'Todo 2', done: false},
                {name:'Todo 3', done: false},
                {name:'Todo 4', done: true},
            ],
            todo: {
                name: '',
                done: false
            }
        }
    },
    methods: {
        addTodo(){
            if(this.todo.name != ''){
                this.todos.push(this.todo)
                this.todo = {
                    name: '',
                    done: false
                }
            }
        },
        toggleTodo(todo){
            let index = this.todos.indexOf(todo);
            this.todos[index].done = !this.todos[index].done
        },
        deleteTodo(todo){
            let index = this.todos.indexOf(todo);
            this.todos.splice(index, 1);
        }
    },
});

Vue.component('todo-item', {
    props: ['item'],
    template: '<li class="list-group-item" v-bind:style="isActive">{{ item.name }}'+
        '<button type="button" class="btn btn-sm btn-success float-right" v-on:click="toggleTodo">'+
        'selesai'+
        '</button>'+
        '<button type="button" class="btn btn-sm btn-danger float-right" aria-label="Close" v-on:click="deleteTodo">'+
        '<span aria-hidden="true">hapus</span>'+
        '</button>'+
    '</li>',
    methods: {
        toggleTodo(){
            this.$emit('toggleTodo', this.item);
        },
        deleteTodo(){
            this.$emit('deleteTodo', this.item);
        }
    },
    computed: {
        isActive(){
            if(this.item.done){
                return 'text-decoration: line-through'
            }
        }
    },
});

var app = new Vue({
    el: '#app'
});

