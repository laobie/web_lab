/**
 * Created by Jaeger on 2016/11/24.
 */

var gankURL = 'http://gank.io/api/day/';
var vm = new Vue({

  el: '#app',

  data: {
    day: new Date(),
    dayData: {
      category: [],
      results: null
    }
  },

  created: function () {
    this.getDayData()
  },

  computed: {
    dateStr: function () {
      var d = this.day;
      return d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate()
    }
  },

  methods: {
    getDateFormat: function () {
      var d = this.day;
      return d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate()
    },
    toLastDay: function () {
      this.day = new Date(this.day - 24 * 60 * 60 * 1000);
    },
    notFuli: function (item) {
      console.log(item.type);
      return item.type != '福利';
    },
    getDayData: function () {
      var xhr = new XMLHttpRequest();
      var self = this;
      xhr.open('GET', gankURL + this.dateStr);
      xhr.onload = function () {
        self.dayData = JSON.parse(xhr.responseText);

      };
      xhr.send()
    }
  }
});

vm.$watch('dayData', function (val) {
  if (val.category.length === 0) {
    this.toLastDay();
  }
});

vm.$watch('day', function () {
  this.getDayData();
});
