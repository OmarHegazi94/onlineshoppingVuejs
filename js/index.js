
vm = new Vue({
    el: "main",
    data: {
        products: products,
        cart: {
            items: [],
        },
        cardActive: false,
    },
    filters: {
        currency: function(value) {
            let formatter = Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0
            });

            return formatter.format(value);
        }
    },
    methods: {
        // check if the product already is in the cart
        // to not draw another table row for the same product
        checkexistproduct(product) {
            testProduct = null;

            for(let i =0; i<this.cart.items.length; i++){
                if(this.cart.items[i].product.id === product.id) {
                    testProduct = this.cart.items[i].product;
                    break;
                }
            }
            return testProduct;
        },
        addTocart: function(product){
            // call to checkexistproduct(product)
            if(this.checkexistproduct(product) == null) {
                this.cart.items.push({
                    product:product,
                    quantity: 1
                });

            } else {
                // product exists in the cart
                for(let x =0; x < this.cart.items.length; x++) {
                    if(this.cart.items[x].product.id == product.id){
                        this.cart.items[x].quantity++;
                        break;
                    }
                }
            }
            product.instock--;
        },
        increaseQuantity: function(item){
            item.quantity++;
            item.product.instock--;
        },
        decreaseQuantity: function(item){
            item.quantity--;
            item.product.instock++;
            if(item.quantity == 0){
                this.cart.items.splice(this.cart.items.indexOf(item), 1);
            }
        }
    },
    computed: {

    }
});
