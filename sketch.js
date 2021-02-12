var player;
var playerimg;
var playerreverseimg;
var playerjumpimg;
var playercrouchimg;
var playersprintimg;
var playerded;
var playerdedimg;
var playerfartimg;

var virus;
var virusimg;

var vb;
var vb2;
var sv;
var svGroup;
var svcount = 1;
var svimg;

var gameover;

var tun11img;
var tun2img;
var tun3img;
var tun1;
var tun2;
var tun3;

var backimg;
var back;

var ground;
var groundimg;
var invisibleground;

var sky;
var skyimg;

var sprint;
var jump;
var crouch;

var next;

var sprintvalue = 0;
var jumpstate = 0;

var gameState = 1;

var gobacktext = 1;

var vaccineimg;
var sanimg;
var maskimg;

var count = 0

var checkpoint;

var obs;
var obsimg;
var obs2;
var obs2img;

var rand;
var rand2;

var crouchcount;

var next;

var gamedeath;

var buttonpress;

var lvl = 1;

var obsGroup;
var obs2Group;

function preload(){
groundimg = loadImage("ground.png")
skyimg = loadImage("skyback.jpg")
playerimg  = loadImage("playerinv.png")
playerreverseimg = loadImage("playerinv1.png")
playerjumpimg = loadImage("player2.png")
playerdedimg = loadImage("ded.png")
playersprintimg = loadImage("playersprint.png")
playercrouchimg = loadImage("playercrouch2.png")
playerfartimg = loadImage("playerfartimg.png")
virusimg = loadImage("virus.png")
svimg = loadImage("spikeimg.png")
tun1img = loadImage("TUN1.png")
vaccineimg = loadImage("VACCINE.png")
sanimg = loadImage("2DSAN.png")
maskimg = loadImage("covmask.png")
obsimg = loadImage("OBSside.png")
obs2img = loadImage("OBSup.png")

checkpoint = loadSound("checkpointsound.mp3")
gamedeath = loadSound("Gamedeath.mp3")
buttonpress = loadSound("butonpress.mp3")
}

function setup(){
  createCanvas(windowWidth, windowHeight);

  ground = createSprite(width/2, height/2+350, 10, 10)
  ground.addImage(groundimg)
  ground.scale = 1.8

  invisibleground = createSprite(width/2-500, height/2+300, 10000, 185)
  invisibleground.visible = false;
  
  sprint = createButton("SPRINT")
  sprint.position(width/2+450, height/2+260)
  sprint.scale = 0.9
  jump = createButton("JUMP")
  jump.position(width/2+350, height/2+260)
  jump.scale = 0.9

  crouch = createButton("CROUCH")
  crouch.position(width/2+550, height/2+260)
  crouch.scale = 0.9

  back = createButton("BACK")
  back.position(width/2, height/2+100)
  back.hide()           

  next = createButton("NEXT")
  next.position(width/2, height/2+100)
  next.hide()

  player = createSprite(width/2-450 , height/2+130, 10, 10)
  player.addImage(playerimg)
  player.scale = 0.7
  player.velocityY = player.velocityY+0.4
  player.setCollider("rectangle", 0, 0, 170, 170)

  virus = createSprite(width/2+500, height/2, 10, 10)
  virus.addImage(virusimg)
  virus.scale = 0.2
  virus.velocityY = -3

  vb = createSprite(width/2+500, height/2-90, 10,10)
  vb.visible = false;
  vb2 = createSprite(width/2+500, height/2+160, 10,10)
  vb2.visible = false; 

  svGroup = new Group();
  obsGroup = new Group();
  obs2Group = new Group();

  lvl = 1;
}

function draw() {
  background(255,255,255);  
if (gameState === 1){

  textSize(15)
  textFont("cooper black")
  text("Score: "+ count, width/2+150, height/2-200);

  ground.velocityX = -(6 + 3*count/100);
      
  count = count+Math.round(getFrameRate()/60);

  if (count>0 && count%100 === 0){  
    checkpoint.play()
  }
  else{
    ground.velocityX = -8
  }

  //rand2 = random(width/2+500, width/2-50)

  if (count === 30){
    lvl = 2
  }


if (lvl === 2){
  console.log(123)
  rand = random(height/2+200, height/2-150)
  if (obsGroup.isTouching(player)){
    gameState = 0.1;
    }
  if(World.frameCount % 40 === 0) {
    obs = createSprite(width/2+750, rand, 10, 10)
    obs.addImage(obsimg)
    obs.scale = 0.5
    obs.velocityX = -4
    obsGroup.add(obs)
  }
  if (count === 60){
    lvl = 3;
  }
}

 if (lvl === 3){
  if (obs2Group.isTouching(player)){
    gameState = 0.1;
  }
  rand2 = random(width/2+450, width/2-400)
  if(World.frameCount % 40 === 0){
    obs2 = createSprite(rand2, height/2+130, 10, 10)
    obs2.addImage(obs2img)
    obs2.scale = 0.5      
    obs2.velocityX = -8
    obs2Group.add(obs2)
    } 
 }

  virus.bounceOff(vb)
  virus.bounceOff(vb2)

  if (World.frameCount % 60 === 0){
    sv = createSprite(virus.x-10, virus.y, 10, 10)
    sv.addImage(svimg)
    sv.scale = 0.1
    sv.velocityX = -7;
    svGroup.add(sv)
  }

  if (svGroup.x = 0){
    sv.destroy()
  }

  if (svGroup.velocityX === 0){
    sv.destroy()
  }

  if (svGroup.isTouching(player)){
    player.visible = false;
    playerded = createSprite(width/2, height/2+200)
    playerded.addImage(playerdedimg)
    playerded.scale = 0.3
    gamedeath.play()
    gameState = 0.1
  }

  if (invisibleground.x < 350){
    invisibleground.x = invisibleground.width/2;
  }

  ground.velocityX = -8

  if (ground.x < 350){
    ground.x = ground.width/2;
  }

  if (player.x === 0){
    player.destroy();
    gameState = 0.1
  } 

  crouch.mousePressed(()=>{
    player.addImage(playercrouchimg)
    player.scale = 0.5
    crouchcount = 1;
  })
  crouch.mouseReleased(()=>{
    player.addImage(playerimg)
    player.scale = 0.7
  })

  sprint.mousePressed(()=>{
    player.addImage(playersprintimg)
    player.x = player.x+200
    sprintvalue = sprintvalue+1
  })

  if (sprintvalue === 1){
    sprint.hide()
  }

  jump.mouseClicked(()=>{
    player.addImage(playerjumpimg)
    player.velocityY = -12
  })
 

  if (player.collide(invisibleground)){
    player.addImage(playerimg)
  }

  if (player.y < height/2-55){
    player.velocityY = 10
  }

  player.collide(invisibleground) 
}

if (gameState === 0.1){
  textSize(25)
  textFont("cooper black")
  fill("red")
  text("YOU LOST. PRESS BACK TO RESTART", width/2-250, height/2)
  back.show()
  sprint.hide()
  jump.hide()
  crouch.hide()
  count.visible = false;
  svGroup.destroyEach()
  virus.velocityY = 0
  ground.velocityX = 0
  obsGroup.destroyEach()
  obs2Group.destroyEach()
  lvl = 0;
}

back.mousePressed(()=>{
  gameState = 1;
  buttonpress.play()
  back.hide()
  sprintvalue = 0;
  sprint.show()
  jump.show()
  crouch.show()
  playerded.visible = false;
  player.visible = true;
  player.scale = 0.7
  player.x = width/2-450
  player.y = height/2+130
  virus.velocityY = -3;
  ground.velocityX = -8;
  count = 0;
})

if (count === 1000){
  textSize(30)
  textFont("cooper black")
  fill("red")
  text("YOU WIN", width/2, height/2)
  sprint.hide()
  jump.hide()
  crouch.hide()
  count.visible = false;
  svGroup.destroyEach()
  sv.x = 1000
  obsGroup.destroyEach()
  obs2Group.destroyEach()
  virus.velocityY = 0;
  virus.x = width/2+100
  player.destroy()
}

  drawSprites()
}