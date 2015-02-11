angular.module('starter.services', [])

.factory('TemperatureService', ['$http', 'PARSE_CREDENTIALS', function($http, PARSE_CREDENTIALS){

    return {
      getAll:function(){
        return $http.get('https://api.parse.com/1/classes/Temperature',{
          headers:{
            'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
            'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
            'Content-Type':'application/json'
          }
        });
      },
      getAllByUser:function(data){
        return $http.get('https://api.parse.com/1/classes/Temperature',{
          headers:{
            'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
            'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
            'Content-Type':'application/json'
          },
          params:{
            where: data
          }
        });
      },
      get:function(id){
        return $http.get('https://api.parse.com/1/classes/Temperature/'+id,{
          headers:{
            'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
            'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
            'Content-Type':'application/json'
          }
        });
      },
      create:function(data){
        return $http.post('https://api.parse.com/1/classes/Temperature',data,{
          headers:{
            'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
            'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
            'Content-Type':'application/json'
          }
        });
      },
      edit:function(id,data){
        return $http.put('https://api.parse.com/1/classes/Temperature/'+id,data,{
          headers:{
            'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
            'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
            'Content-Type':'application/json'
          }
        });
      },
      delete:function(id){
        return $http.delete('https://api.parse.com/1/classes/Temperature/'+id,{
          headers:{
            'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
            'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
            'Content-Type':'application/json'
          }
        });
      }
    }

}])

.value('PARSE_CREDENTIALS',{
    APP_ID: 'AVK6janhsjZihCK9sXfVEizaFb0rp6VSPnVmE1HM',
    REST_API_KEY:'vVJvtTqvxxyZUK8DjnSZmwQt4KaLnGuIaMDrsMMu'
});





/*
.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlin',
    lastText: 'Did you get the ice cream?',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  }
});
*/
