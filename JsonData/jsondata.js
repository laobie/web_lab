var vm = new Vue({
  el: '#app',

  data: {
    imgs: [
      {
        "url": "http://www.ssyer.com/uploads/20161129142722_370.jpg"
      },
      {
        "url": "http://www.ssyer.com/uploads/20161129142722_370.jpg"
      },
      {
        "url": "http://www.ssyer.com/uploads/20161129142722_370.jpg"
      }
    ]
  },

  created: function () {
    this.getImgs();
  },

  methods: {
    getImgs: function () {
      var xhr = new XMLHttpRequest();
      var self = this;

      xhr.open('GET', 'http://ac-juokacnr.clouddn.com/9d4d278e2bad33791b2a.json', true);

      xhr.onload = function () {
        self.imgs = JSON.parse(xhr.responseText);
      };
      xhr.onerror = function () {
        console.log('There was an error!')
      };
      xhr.send();
    }
  }

});