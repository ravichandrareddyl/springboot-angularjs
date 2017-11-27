var HitsComponent = ng.core.Component({
    templateUrl : 'js/hits/hits.html'
}).Class({
	ngOnInit: function () {
		this.route.params.subscribe(params => { this.id = +params['id'];})
		console.log('id is' + this.id);
    },
    constructor : [AppService, ng.http.Http, ng.router.ActivatedRoute, function(app, http, route) {
        var self = this;
        self.route = route;
        this.damFiles = [];
        
        http.post('damProfiles').subscribe(response => self.damFiles = response.json());
        
        
        //http.post('damProfiles').subscribe(response => self.homeModel.damFiles = response.json());
        this.authenticated = function() { return app.authenticated; };
    }]
});
