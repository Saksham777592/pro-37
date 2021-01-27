class Food {
    constructer() {
        this.foodStock = 0;
        this.lastFed = 0;
        this.image = loadImage("images/milk.png");
        this.bedroomImage = loadImage("images/bedRoom.png");
        this.gardenImage = loadImage("images/garden.png");
        this.washroomImage = loadImage("images/washRoom.png");
    }

    updateFoodStock(foodS) {
        this.foodStock = foodS;
    }

    deductFood() { 
        if(this.foodStock > 0){
           this.foodStock = this.foodStock - 1;
        }
    }
    
    getFoodStock() {
       return this.foodStock;
    }
    
    display() {
        var x = 80, y = 100;

        if(this.foodStock!==0) {
            for(var i = 0; i < this.foodStock; i++) {
                if(i%10==0) {
                    x = 80;
                    y= y + 50;
                }
                imageMode(CENTER);
                image(this.image, x, y, 50, 50);
                x = x + 30;
            }
        }
    }

    bedroom() {
        background(this.bedroomImage, 550, 500);
    }

    garden() {
        background(this.gardenImage,550,500);
    }

    washroom() {
        background(this.washroomImage,550,500);
    }
     
}