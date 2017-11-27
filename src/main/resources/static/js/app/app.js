var AppService = ng.core.Injectable({}).Class({constructor: [ng.http.Http, function(http) {

    var self = this;
    this.authenticated = false;
    this.authenticate = function(credentials, callback) {

        var headers = credentials ? {
            authorization : "Basic " + btoa(credentials.username + ":" + credentials.password)
        } : {};
        http.get('user', {headers: headers}).subscribe(function(response) {
            if (response.json().name) {
                self.authenticated = true;
            } else {
                self.authenticated = false;
            }
            callback && callback();
        });

    }

}]})


var LoaderService = ng.core.Injectable({}).Class({
	constructor : function() {
		var self = this;
		self.status = false;
		self.display = function(status) {
			self.status = status;
		}
	}
});

var AppComponent = ng.core.Component({
        templateUrl: 'js/app/app.html',
        selector: 'app',
        providers: [AppService, LoaderService]
    }).Class({
        constructor : [AppService, ng.http.Http, ng.router.Router,  function(app ,http, router) {
            app.authenticate();
            
            this.showLoader = false;
            
            this.logout = function() {
                http.post('logout', {}).subscribe(function() {
                    app.authenticated = false;
                    router.navigateByUrl('/login')
                });
            }
        }]
    }
    );
