/**
 * Created by Jaeger on 2016/11/25.
 */

var githubAPI = 'https://api.github.com/';

Vue.component('grid-sheet', {
  template: '#grid-sheet',
  props: {
    data: Array,
    columns: [
      {title: '', key: ''}
    ],
    filterKey: String
  },

  data: function () {
    var sortOrders = {};
    this.columns.forEach(function (column) {
      sortOrders[column.key] = 1
    });
    return {
      sortKey: '',
      sortOrders: sortOrders
    }
  },

  methods: {
    sortBy: function (key) {
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] * -1
    }
  }
});

var vm = new Vue({
  el: '#app',

  data: {
    userName: 'laobie',
    repos: [],
    page: 1,
    data: [],
    columns: [
      {title: 'name', key: 'name'},
      {title: 'language', key: 'language'},
      {title: 'star', key: 'stargazers_count'},
      {title: 'fork', key: 'forks_count'}
    ],
    showFork: false
  },

  computed: {
    starsCount: function () {
      var count = 0;
      this.repos.forEach(function (item) {
        count = count + item.stargazers_count;
      });
      return count;
    }
  },

  created: function () {
    this.getRepos();
  }
  ,

  methods: {
    isName: function (key) {
      console.log(key);
      return key === "name";
    },

    update: function () {
      if (this.userName) {
        this.page = 1;
        this.getRepos();
      }
    },

    getRepos: function () {
      var xhr = new XMLHttpRequest();
      var self = this;

      var url = githubAPI + 'users/' + self.userName + '/repos?page=' + self.page;
      xhr.open('GET', url);

      xhr.onload = function () {
        if (self.page === 1) {
          self.repos = [];
        }
        self.data = JSON.parse(xhr.responseText);

        self.repos = self.data.reduce(function (coll, item) {
          coll.push(item);
          return coll;
        }, self.repos);

        if (!self.showFork) {
          self.repos = self.repos.filter(function (item) {
            return !item.fork;
          });
        }

      };

      xhr.send()
    }
  }
});

vm.$watch('showFork', function () {
  this.update();
});

vm.$watch('data', function (val) {
  if (val.length == 30) {
    this.page++;
    this.getRepos();
  }
});