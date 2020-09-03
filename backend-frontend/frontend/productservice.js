var demo = new Vue({
	el: '#app',
	data: {
		result: '',
		error: '',
		product: {
			id: 0,
			name: '',
			price: ''
		},
		products: []
	},
	methods: {
		save: function(){
			if(this.product.name==='' || this.product.price===''){
				this.error = 'Name and Price field are required';
				return
			}
			this.error = '';
			this.result = 'Saving data to server...';
			var postdata = {
				'op': 'save',
				'data': this.product
			};

			this.$http.post('http://localhost:8080/api.php', postdata, {
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(response => {
				this.result = response.body;
				this.product.id = 0;
				this.product.name = '';
				this.product.price = '';
				this.getAllData();
			}, response => {
				this.result = 'Failed to save data to server';
			});
		},
		editItem: function(item){
			this.product.id = item.id;
			this.product.name = item.name;
			this.product.price = item.price;
		},
		deleteItem: function(item){
			var r = confirm('Are you sure to delete this data?');
			if(r==true){
				this.result = 'Deleting data to server';
				var postdata = {
					op: 'delete',
					id: item.id
				};
				this.$http.post('http://localhost:8080/api.php', JSON.stringify(postdata), {
					headers: {
						'Content-Type': 'application/json'
					}
				}).then(response => {
					this.result = response.body;
					this.getAllData();
				}, response => {
					this.result = 'Failed to delete data';
				});
			}
		},
		getAllData: function(){
			this.result = 'Get data to server...';
			var postdata = {
				op: 'getproducts'
			};
			this.$http.post('http://localhost:8080/api.php', JSON.stringify(postdata), {
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(response => {
				this.result = '';
				this.products = response.body.data;
				// console.log(response.body.data);
			}, response => {
				this.result = 'Failed to load data to server';
			});
		}
	},
	beforeMount(){
		this.getAllData();
	}
});