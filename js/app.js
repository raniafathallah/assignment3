(function () {
'use strict';

angular.module('MenuCategoriesApp', [])
.controller('MenuCategoriesController', MenuCategoriesController,'$scope')
.service('MenuCategoriesService', MenuCategoriesService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


MenuCategoriesController.$inject = ['MenuCategoriesService','$scope'];
function MenuCategoriesController(MenuCategoriesService,$scope) {
  var menu = this;

  $scope.$watch(function () { 

         menu.categories= MenuCategoriesService.getItemscat();
          menu.view=MenuCategoriesService.getItemView();
  });
    //console.log(MenuCategoriesService.getItemscatLength());
  menu.logMenuItems = function (shortName) {
    var promise = MenuCategoriesService.getMenuForCategory(shortName);

    promise.then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
  };
  
    menu.searchItems=function(searchVal){
         //   MenuCategoriesService.setCateEmplty();
        //  MenuCategoriesService.setCateEmplty();
         MenuCategoriesService.setSearch(searchVal);
        if(searchVal.length==0){
           MenuCategoriesService.setCateEmplty();
              MenuCategoriesService.setItemView("hidd")
        }else{
                 MenuCategoriesService.setCate();
             console.log(MenuCategoriesService.getItemscatLength());
           MenuCategoriesService.setItemView("hidden")
        }
        //  if(MenuCategoriesService.getItemscatLength()>0){
           //   console.log(MenuCategoriesService.getItemscatLength());
          

 
    };
    menu.removeItem=function($index){
           MenuCategoriesService.delete();
    };
}


MenuCategoriesService.$inject = ['$http', 'ApiBasePath'];
function MenuCategoriesService($http, ApiBasePath) {
  var service = this;
  var cate=[];
    var view="hidd";
  var searchword;
  service.getMenuCategories = function () {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/categories.json")
    });

    return response;
  };


  service.getMenuForCategory = function (shortName) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
      params: {
        category: shortName
      }
    });

    return response;
  };

  service.getItemscat = function () {
    return cate;
  };
  service.getItemscatLength = function () {
    return cate.length;
  };
    service.setCate=function() {
        
        
        var promise = this.getMenuCategories();

          promise.then(function (response) {
            if(searchword.length>0 ){
                   cate = response.data;
            }
        
          })
          .catch(function (error) {
            console.log("Something went terribly wrong.");
          });
        

    };
    service.setCateEmplty=function() {
              cate =[]; 
       };
    service.setSearch=function(value){
        searchword=value;
    };
    
    service.setItemView=function(value){
        view=value;
    };
    
    service.getSearch=function(){
        return searchword;
    };
    service.getItemView=function(){
        return view;
    };
    service.delete=function(itemIndex){
        cate.splice(itemIndex, 1);
    };
    service.checkCat=function(){
    /*    if(cat){
            this.setItemView("hidden");
            
        }*/
    };
    
}

})();
