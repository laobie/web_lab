/**
 * Created by Jaeger on 2016/11/24.
 */

var gankURL = 'http://gank.io/api/day/';
var demo = new Vue({

    el: '#app',

    data: {
        branches: ['master', 'dev'],
        currentBranch: 'master',
        dayData: {
            results: [{}]
        }
    },

    created: function () {
        this.getDayData()
    },

    methods: {
        getToday: function () {
            var d = new Date();
            return d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate()
        },
        notFuli: function (item) {
            console.log(item.type);
            return item.type != '福利';
        },
        getDayData: function () {
            var xhr = new XMLHttpRequest();
            var self = this;
            xhr.open('GET', gankURL + this.getToday());
            xhr.onload = function () {
                self.dayData = JSON.parse(xhr.responseText);
            };
            xhr.send()
        }
    }
});
