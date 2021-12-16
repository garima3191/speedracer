class Form {
  constructor() {
    this.input = createInput("").attribute("placeholder", "Enter your name");
    this.playButton = createButton("Play");
    this.titleImg = createImg("./assets/titleone.png", "game title");
    this.greeting = createElement("h2");
    this.mainGreeting = createElement("h2")
  }

  setElementsPosition() {
    this.titleImg.position(120, 50);
    this.mainGreeting.position(width / 2 - 300,height / 2 - 5)
    this.input.position(width / 2 - 110, height / 2 - 80);
    this.playButton.position(width / 2 - 90, height / 2 - 20);
    this.greeting.position(width / 2 - 500, height / 2 - 100);
  }

  setElementsStyle() {
    this.titleImg.class("gameTitle");
    this.input.class("customInput");
    this.playButton.class("customButton");
    this.greeting.class("greeting");
    this.mainGreeting.class("greeting");
  }

  hide() {
    this.greeting.hide();
    this.playButton.hide();
    this.input.hide();
    this.mainGreeting.hide();
  }

  handleMousePressed() {
    this.playButton.mousePressed(() => {
      this.input.hide();
      this.playButton.hide();
      this.mainGreeting.hide();
      var message = `
      Hello ${this.input.value()}
      </br>another astronaut will be joining for the mission...`;
      this.greeting.html(message);
      playerCount += 1;
      player.name = this.input.value();
      player.index = playerCount;
      player.addPlayer();
      player.updateCount(playerCount);
      player.getDistance();
    });
  }


  display() {


    this.mainGreeting.html("Astronaut watch out for Astroids");
    
    this.setElementsPosition();
    this.setElementsStyle();
    this.handleMousePressed();
    
  }
}
