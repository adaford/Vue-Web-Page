var App = new Vue({
  el: '#my-vue-app',
  data: {
  	defaultImg : {src : "img/bp1.jpg", isActive : [true, false, false, false], hue : "filter: hue-rotate(0deg);"},

  	checkout : {quantity : 1, cartCount : "( 1 )", show : "display: none;", valid : "visibility: hidden;"},

  	openBag : [{desc : "Rugged 493 Backpack", quantity : 1, cost : 493, style : "filter: hue-rotate(0deg);"}],

  	color : {isActive : [true, false, false, false]},

  	reviewForm : {star : ["img/star_filled.png", "img/star.png", "img/star.png", "img/star.png", "img/star.png"], 
  				  title : "", rev : "", yourRating : "You have not rated yet!", locked : false},

  	submittedReviews : [{title : "Wonderful backpack!", 
  						star : ["img/star_filled.png", "img/star_filled.png", "img/star_filled.png",
  							    "img/star_filled.png", "img/star_filled.png"], 
  					    rev : "Nice and durable! My niece has had this for about 2 or 3 months now. " +
  					    "I didn't want to write a review without knowing for sure it would last. " +
  					    "It is still like new and she is terribly rough on book bags! She drags them, " +
  					    "stuffs them, slings them around, uses it as weapon against her brother, " + 
  					    "and sits on it on during her hour long bus ride. We washed once and did not fade. " +
  					    "No holes in the bottom or seams yet either. The material is so strong!", 
  					    show : "visibility : hidden;"}]
  },

  methods: {
  	changePic: function(event) {
  		if (!event.target.src) 
  			return false
  		index = event.target.id.replace(/\D/g,'')
  		this.defaultImg.isActive = [false, false, false, false]
  		this.defaultImg.isActive[parseInt(index) - 1] = true
  		this.defaultImg.src = event.target.src
  	},

 	buyMenu: function(event) {
 		switch(event.target.id) {
		case "add-qty":
			this.checkout.quantity++
		break;

		case "sub-qty":
			if (this.checkout.quantity > 1)
				this.checkout.quantity--
		break

		case "add-cart":
			if (this.checkout.quantity > 0) {
				//change number of items in cart
				var a = this.checkout.cartCount.replace("( ", '');
				var count = parseInt(a.replace(" )", ''));
				count += parseInt(this.checkout.quantity);
				this.checkout.cartCount = "( " + count.toString() + " )"

				//insert new items into bag "picture, description, price, and quantity of the item that was added"
				var item = {}
				item["desc"] = "Rugged 493 Backpack"
				item["quantity"] = this.checkout.quantity
				item["cost"] = 493 * this.checkout.quantity;
				item["style"] = this.defaultImg.hue

				this.openBag.push(item)
			}
		break
  		}
  	},

  	mouseOn: function() {
		this.checkout.show = "display: inline;"	
  	},

  	mouseOff: function() {
  		this.checkout.show = "display: none;"	
  	},

  	changeColor: function(event) {
  		if (!event.target.id)
  			return false
  		var color_id = event.target.id;
		var color_map = {
			"default-color": 0,
			"green-color": 100,
			"blue-color": 200,
			"pink-color": 300
		}
		this.defaultImg.hue = "filter: hue-rotate(" + color_map[color_id] + "deg);"
		this.color.isActive = [false,false,false,false]
		this.color.isActive[color_map[color_id] / 100] = true
  	},

  	qty: function(event) {
  		if (!$.isNumeric(this.checkout.quantity) || (this.checkout.quantity < 1)) {
  			this.checkout.valid = "visibility: visible;"
  			if (event.target.id != "item-amount") {
  				this.checkout.quantity = 1
  				this.checkout.valid = "visibility: hidden;"
  			}
  		}
  		else {
  			this.checkout.valid = "visibility: hidden;"
  		}
  	}, 

  	review: function(event) {

  		function updateStars(index) {
  			var t = "img/star_filled.png"
  			var f = "img/star.png"
  			App.reviewForm.star = [f,f,f,f,f]
  			for (i = 0; i < index; i++) {
  				App.reviewForm.star[i] = t
  			}
  		}

  		if (event.target.id > 0 && event.target.id < 6) {
  			updateStars(parseInt(event.target.id))
  		}

  		if (event.target.type == "submit") {
  			event.preventDefault()

  			if (this.reviewForm.title != "" && this.reviewForm.rev != "") {
				//delete top comment if added already
				if (this.submittedReviews.length > 1) {
					this.submittedReviews.splice(0,1)
				}

				//add review
				var r = {}
				r["title"] = this.reviewForm.title
				r["star"] = this.reviewForm.star
				r["rev"] = this.reviewForm.rev
				r["show"] = "visibility : visible;"
				this.submittedReviews.unshift(r)
				this.reviewForm.yourRating = ""
				this.reviewForm.locked = true
			}

	  	}
	},

	editRev: function() {
		this.reviewForm.locked = false
	},

	deleteRev: function() {
		this.submittedReviews.splice(0,1)
		this.reviewForm.yourRating = "You have not rated yet!"
		this.reviewForm.locked = false
	}

  }
});
