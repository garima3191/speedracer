class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");

    this.leadeboardTitle = createElement("h2");

    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");
    //this.playerMoving = false;
    this.stage1 = false;
    this.makeitvisible=false
    this.spaceShipAccess = false;
    this.spaceShipAccessOne = false;
  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }
  spaceShipVisible(index){
    
      if (index === 1) {
        spaceship[index-1]. visible = true;
        
        
  
         // player.update();
        }
     // }
      if (index === 2) {
          spaceship[index-1] .visible = true;
          //player.update();
        }
      
    
  }
  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;
    car1.addImage("playerchange",spaceShipImg)
    car2 = createSprite(width / 2 + 150, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;
    car2.addImage("playerchange",spaceShipImg)
    spaceShip1 = createSprite(width/2 - 150,height - 500);
    spaceShip1.addImage("spaceShip1",spaceShipImg);
    spaceShip1.scale = 0.3;
    spaceShip1 .visible = false;

    spaceShip2 = createSprite(width/2 + 100,height - 500);
    spaceShip2.addImage("spaceShip1",spaceShipImg);
    spaceShip2.scale = 0.3;
    spaceShip2.visible = false;

    cars = [car1, car2];
    spaceship=[spaceShip1,spaceShip2]
    fuels = new Group();
    powerCoins = new Group();

    obstacles = new Group();

    var obstaclesPositions = [
      { x: width / 2 + 250, y: height - 800, image: obstacle2Image },
      { x: width / 2 - 150, y: height - 1300, image: obstacle1Image },
      { x: width / 2 + 250, y: height - 1800, image: obstacle1Image },
      { x: width / 2 - 180, y: height - 2300, image: obstacle2Image },
      { x: width / 2, y: height - 2800, image: obstacle2Image },
      { x: width / 2 - 180, y: height - 3300, image: obstacle1Image },
      { x: width / 2 + 180, y: height - 3300, image: obstacle2Image },
      { x: width / 2 + 250, y: height - 3800, image: obstacle2Image },
      { x: width / 2 - 150, y: height - 4300, image: obstacle1Image },
      { x: width / 2 + 250, y: height - 4800, image: obstacle2Image },
      { x: width / 2, y: height - 5300, image: obstacle1Image },
      { x: width / 2 - 180, y: height - 5500, image: obstacle2Image }
    ];

    // Adding fuel sprite in the game
    this.addSprites(fuels, 4, fuelImage, 0.02);

    // Adding coin sprite in the game
    this.addSprites(powerCoins, 18, powerCoinImage, 0.09);

    //Adding obstacles sprite in the game
    this.addSprites(
      obstacles,
      obstaclesPositions.length,
      obstacle1Image,
      0.2,
      obstaclesPositions
    );
  }

  addSprites(spriteGroup, numberOfSprites, spriteImage, scale, positions = []) {
    for (var i = 0; i < numberOfSprites; i++) {
      var x, y;

      //C41 //SA
      if (positions.length > 0) {
        x = positions[i].x;
        y = positions[i].y;
        spriteImage = positions[i].image;
      } else {
        x = random(width / 2 + 150, width / 2 - 150);
        y = random(-height * 4.5, height - 400);
      }
      var sprite = createSprite(x, y);
      sprite.addImage("sprite", spriteImage);

      sprite.scale = scale;
      spriteGroup.add(sprite);
    }
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");

    //C39
    this.resetTitle.html("Reset Game");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width / 2 + 200, 40);

    this.resetButton.class("resetButton");
    this.resetButton.position(width / 2 + 230, 100);

    this.leadeboardTitle.html("Leaderboard");
    this.leadeboardTitle.class("resetText");
    this.leadeboardTitle.position(width / 3 - 60, 40);

    this.leader1.class("leadersText");
    this.leader1.position(width / 3 - 50, 80);

    this.leader2.class("leadersText");
    this.leader2.position(width / 3 - 50, 130);
  }

  play() {
    this.handleElements();
    this.handleResetButton();

    Player.getPlayersInfo();
    player.getCarsAtEnd();

    if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6);

      this.showFuelBar();
      this.showLife();
      this.showLeaderboard();

      //index of the array
      var index = 0;
      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;

        //use data form the database to display the cars in x and y direction
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        
        var currentStage = allPlayers[plr].stage;
          console.log(currentStage)
        if (currentStage === true ) {
          console.log("inside stage")
          cars[index - 1].changeImage("playerchange");
          cars[index - 1].scale = 0.3;
        }
        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;
        if(this.makeitvisible==false){
          console.log("hello")
          spaceship[index-1].position.x=x;
          spaceship[index-1].position.y=y-500;
        }
       
        if (index === player.index) {
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);

          this.handleFuel(index);
          this.handlePowerCoins(index);
          console.log(player.positionY )
           if(player.positionY>1000){
             this.makeitvisible=true;
            this.spaceShipVisible(index);
            this.handleCarACollisionWithCarB(index);
          }
         
          // Changing camera position in y direction
          camera.position.y = cars[index - 1].position.y;
        }
        /*if(this.playerMoving == true){
          player.positionY +=3;
          player.update();
        }*/
        if(this.stage1 == true){
          player.positionY +=4;
        }
      }

      // handling keyboard events
      this.handlePlayerControls();
    
     // this.spaceShipVisible();

      

      // Finshing Line
      const finshLine = height * 6 - 100;

      if (player.positionY > finshLine) {
        gameState = 2;
        player.rank += 1;
        Player.updateCarsAtEnd(player.rank);
        player.update();
        this.showRank();
      }

      drawSprites();
    }
  }

  handleResetButton() {
    this.resetButton.mousePressed(() => {
      database.ref("/").set({
        playerCount: 0,
        gameState: 0,
        players: {},
        carsAtEnd: 0,
        stage:false
      });
      window.location.reload();
    });
  }

  showLife() {
    push();
    image(lifeImage, width / 2 - 130, height - player.positionY - 300, 20, 20);
    fill("white");
    rect(width / 2 - 100, height - player.positionY - 300, 185, 20);
    fill("#f50057");
    rect(width / 2 - 100, height - player.positionY - 300, player.life, 20);
    noStroke();
    pop();
  }

  showFuelBar() {
    push();
    image(fuelImage, width / 2 - 130, height - player.positionY - 250, 20, 20);
    fill("white");
    rect(width / 2 - 100, height - player.positionY - 250, 185, 20);
    fill("#ffc400");
    rect(width / 2 - 100, height - player.positionY - 250, player.fuel, 20);
    noStroke();
    pop();
  }

  showLeaderboard() {
    var leader1, leader2;
    var players = Object.values(allPlayers);
    console.log(players[0].rank);
    console.log(players[1].rank);
    if (
      (players[0].rank === 0 && players[1].rank === 0) ||
      players[0].rank === 1
    ) {
      console.log("1")
      // &emsp;    This tag is used for displaying four spaces.
      leader1 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;

      leader2 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;
    }

    if (players[1].rank === 1) {
      console.log("1")
      leader1 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;

      leader2 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;
    }

    this.leader1.html(leader1);
    this.leader2.html(leader2);
  }

  handlePlayerControls() {
    if (keyIsDown(UP_ARROW)) {
      player.positionY += 3;
      player.update();
     // this.playerMoving = true;
    }

    if (keyIsDown(LEFT_ARROW) && player.positionX > width / 3 - 50) {
      player.positionX -= 5;
      player.update();
    }

    if (keyIsDown(RIGHT_ARROW) && player.positionX < width / 2 + 300) {
      player.positionX += 5;
      player.update();
    }
  }
  handleCarACollisionWithCarB(index) {
    console.log("inside collision")
    
    if (index === 1) {
      console.log("inside index1")
      console.log(player.score);
      if (cars[index - 1].collide(spaceship[index-1]) && player.score >60) {
        console.log("collided")
        this.stage1 = true;
        //this.update(1);
        player.stage=true;
      
        
      }else if(player.score <60 && this.spaceShipAccess === false){
        this.cantEnter();
        this.spaceShipAccess = true;
      }

      
      
      
    }
    if (index === 2) {
      console.log("inside index2")
      console.log(player.score);
      if (cars[index - 1].collide(spaceship[index-1]) && player.score  >60) {
        console.log("collided")
        this.stage1 = true;
        player.stage=true;
        //this.update(1);
      
      }else if(player.score <60 && this.spaceShipAccessOne === false){

        this.cantEnter();
        this.spaceShipAccessOne = true;
      }
      
    }
    player.update();
  }

  handleFuel(index) {
    // Adding fuel
    cars[index - 1].overlap(fuels, function(collector, collected) {
      player.fuel = 185;
      //collected is the sprite in the group collectibles that triggered
      //the event
      collected.remove();
    });
    if(player.fuel>0){
      player.fuel -=0.3;
    }
    if(player.fuel<=0){
      gameState = 2;
      this.gameOver();
    }
  }

  handlePowerCoins(index) {
    cars[index - 1].overlap(powerCoins, function(collector, collected) {
      player.score += 21;
      player.update();
      //collected is the sprite in the group collectibles that triggered
      //the event
      collected.remove();
    });
  }

  showRank() {
    swal({
      title: `Awesome!${"\n"}Rank${"\n"}${player.rank}`,
      text: "You reached the finish line successfully",
      imageUrl:
        "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
      imageSize: "100x100",
      confirmButtonText: "Ok"
    });
  }

  gameOver() {
    swal({
      title: `Game Over`,
      text: "Oops you lost the race....!!!",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing"
    });
  }

  cantEnter() {
    swal({
      title: `Permission Denied`,
      text: "Not Enough Coins to Enter",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Ok"
    });
  }
  
}
