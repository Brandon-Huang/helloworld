/* global Vue */
/* global axios*/ //

Vue.component('todo-item', {
  template: '<li>{{item.text}}</li>',
  props: ['item']
})

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    message2: 'You loaded this page on ' + new Date().toLocaleString(),
    seen: true,
    todos: [
      { id: 1, text: 'Learn JavaScript' },
      { id: 2, text: 'Learn Vue' },
      { id: 3, text: 'Build something awesome' }
    ],
    numbers: [1, 2, 3, 4, 5],
    isActive: true,
    ok: false,
    loginType: 'username'
  },
  methods: {
    reverseMessage: function() {
      this.message = this.message
        .split('')
        .reverse()
        .join('')
    },
    evenNumbers2: function(numbers) {
      console.log('haha')
      return numbers.filter(x => x % 2 == 0)
    },
    toggle: function() {
      this.loginType = this.loginType === 'username' ? 'Email' : 'username'
    }
  },
  computed: {
    evenNumbers: function() {
      console.log('get')
      return this.numbers.filter(x => x % 2 == 0)
    }
  }
})

var watchExampleVM = new Vue({
  el: '#watch-example',
  data: {
    question: '',
    answer: 'I cannot give you an answer until you ask a question!'
  },
  watch: {
    // whenever question changes, this function will run
    question: function(newQuestion, oldQuestion) {
      this.answer = 'Waiting for you to stop typing...'
      this.debouncedGetAnswer()
    }
  },
  created: function() {
    // _.debounce is a function provided by lodash to limit how
    // often a particularly expensive operation can be run.
    // In this case, we want to limit how often we access
    // yesno.wtf/api, waiting until the user has completely
    // finished typing before making the ajax request. To learn
    // more about the _.debounce function (and its cousin
    // _.throttle), visit: https://lodash.com/docs#debounce
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
  },
  methods: {
    getAnswer: function() {
      if (this.question.indexOf('?') === -1) {
        this.answer = 'Questions usually contain a question mark. ;-)'
        return
      }
      this.answer = 'Thinking...'
      var vm = this
      console.log(this)
      axios
        .get('https://yesno.wtf/api')
        .then(function(response) {
          vm.answer = _.capitalize(response.data.answer)
        })
        .catch(function(error) {
          vm.answer = 'Error! Could not reach the API. ' + error
        })
    }
  }
})
