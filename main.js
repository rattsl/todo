var STORAGE_KEY = 'todos-vuejs-2.0'
var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach(function (todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

const app = new Vue({
    el: '#app',
    data: {
      // 使用するデータ
      todos: [],
      options: [
          {
              value: -1, label: "全て"
          },
          {
              value: 0, label: "作業中"
          },
          {
              value: 1, label: "完了"
          }
      ],
      current: -1
    },
    watch:{
        todos:{
            handler: function(todos){
                todoStorage.save(todos)
            },
            deep: true

        }

    },
    computed:{
        computedTodos: function(){
            return this.todos.filter(function(el) {
                return this.current < 0 ? true : this.current === el.state
              }, this)
        },
        labels() {
            return this.options.reduce(function(a, b) {
              return Object.assign(a, { [b.value]: b.label })
            }, {})
            // キーから見つけやすいように、次のように加工したデータを作成
            // {0: '作業中', 1: '完了', -1: 'すべて'}
          }
    },
    created(){
        this.todos = todoStorage.fetch()

    },
    methods: {
      // 使用するメソッド
      doAdd: function(event,value){
        var comment = this.$refs.comment

        if(!comment.value.length){
            return
        }

        this.todos.push({
            id: todoStorage.uid++,
            comment:comment.value,
            state: 0
        })
        comment.value = ""
      },
      doChangeState: function(item){
        item.state = item.state ? 0:1
      },
      doRemove: function(item){
          alert("消すよ")
        var index = this.todos.indexOf(item)
        this.todos.splice(index,1)
      }
    }
  })