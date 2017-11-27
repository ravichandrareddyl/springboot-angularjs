(function () {
  angular.module('home', ['auth', 'utils', 'ngAnimate', 'toaster'])
  .controller('home', function($scope, $http, auth, toaster) {
    var self = this;
    
    self.visible = false;
    self.visibleAnimate = false;
    
    self.openhits = function() {
      router.navigate(['/hits/', 12]);
    }
    
    self.show = function (event) {
      //event.stopPropagation();
      //event.preventDefault();
      self.visible = true;
      self.visibleAnimate = true;
    }
    
    self.hide = function (event) {
      //event.stopPropagation();
      //event.preventDefault();
      self.visibleAnimate = false;
      self.visible = false;
    }
    
   /* self.onContainerClicked = function (event) {
      if ((event.target).classList.contains('modal')) {
            self.hide();
          }
    }*/
    
    self.uploadedFile = function (event) {
      var fileList = event.target.files;
      if (fileList.length > 0) {
          var file = fileList[0];
          var formData = new FormData();
          formData.append('uploadfile', file, file.name);
          $http.post('csvupload', formData,  {headers: {'Content-Type': undefined}})
            .then(response => {
              toaster.success({title: "title", body:"text1"}, 3000);
              event.target.value = null;
              self.hide();
            })
            .catch(function (error){
              console.log('error');
              event.target.value = null;
              self.hide();
            })
      }
    }
    
    self.authenticated = function() { return auth.authenticated; };
    
    function activate () {
      $http.post('damProfiles')
        .then(function(response){
          self.damFiles = response.data;
        })
        .catch(function (err) {
          console.log('failed to load DAM files');
        })
    }
    
    
   /* toaster.success({title: "title", body:"text1"});
    toaster.error("title", "text2");
    toaster.pop({type: 'wait', title: "title", body:"text"});
    toaster.pop('success', "title", '<ul><li>Render html</li></ul>', 5000, 'trustedHtml');
    toaster.pop('error', "title", '<ul><li>Render html</li></ul>', null, 'trustedHtml');
    toaster.pop('wait', "title", null, null, 'template');
    toaster.pop('warning', "title", "myTemplate.html", null, 'template');
    toaster.pop('note', "title", "text");
    toaster.pop('success', "title", 'Its address is https://google.com.', 5000, 'trustedHtml', function(toaster) {
        var match = toaster.body.match(/http[s]?:\/\/[^\s]+/);
        if (match) $window.open(match[0]);
        return true;
    });
    toaster.pop('warning', "Hi ", "{template: 'myTemplateWithData.html', data: 'MyData'}", 15000, 'templateWithData');
    toaster.pop('warning', "title", 'Bill');*/
    
    activate();
    });
})();