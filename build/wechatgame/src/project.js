__require=function i(t,r,e){function s(n,h){if(!r[n]){if(!t[n]){var c="function"==typeof __require&&__require;if(!h&&c)return c(n,!0);if(o)return o(n,!0);throw new Error("Cannot find module '"+n+"'")}var d=r[n]={exports:{}};t[n][0].call(d.exports,function(i){var r=t[n][1][i];return s(r||i)},d,d.exports,i,t,r,e)}return r[n].exports}for(var o="function"==typeof __require&&__require,n=0;n<e.length;n++)s(e[n]);return s}({game:[function(i,t,r){"use strict";cc._RF.push(t,"cf336cEAD1Nr4xwRdns1EnF","game"),cc.Class({extends:cc.Component,properties:{ground:{default:null,type:cc.Node},bird:{default:null,type:cc.Node},background:{default:null,type:cc.Node},pillar1:{default:null,type:cc.Node},pillar2:{default:null,type:cc.Node},scoreDisplay:{default:null,type:cc.Label},button:{default:null,type:cc.Node},jumpAudio:{default:null,type:cc.AudioClip},title:{default:null,type:cc.Node},groundSpeed:10,birdFloatSpeed:.5,fpscount:0,isGameOver:!1},onLoad:function(){this.button.active=!1,this.scoreDisplay.node.active=!1,this.title.active=!0,this.firstTimeEnd=!0,this.score=0,this.bird.isprepared=!1,this.pillar1.y=700*Math.random()-280,this.pillar2.y=700*Math.random()-280,this.node.on(cc.Node.EventType.TOUCH_START,this.touchFunction,this),this.button.on("click",this.buttonClick,this)},touchFunction:function(){this.bird.stopAllActions(),this.jumpAction=this.setJumpAction(),this.bird.isprepared=!0,this.bird.runAction(this.jumpAction)},buttonClick:function(){cc.director.loadScene("game")},setJumpAction:function(){this.bird.jumpHeight=100,this.bird.jumpDuraction=.25,this.bird.jumpRotation=-15,this.bird.dropTurnDuration=.2,this.bird.dropDownDuration=1.3,this.bird.dropRotation=90;var i=cc.moveBy(this.bird.jumpDuraction,cc.v2(0,this.bird.jumpHeight)),t=cc.rotateTo(0,-15),r=cc.moveBy(this.bird.jumpDuraction,cc.v2(0,-this.bird.jumpHeight)),e=cc.rotateTo(this.bird.dropTurnDuration,this.bird.dropRotation),s=cc.moveTo((this.bird.y+640)/1280*this.bird.dropDownDuration,this.bird.x,-512),o=cc.callFunc(this.playJumpSound,this);return this.bird.spawn=cc.spawn(e,s),cc.sequence(t,o,i,r,this.bird.spawn)},playJumpSound:function(){cc.audioEngine.playEffect(this.jumpAudio,!1)},groundMove:function(){this.ground.x-=this.groundSpeed,this.ground.x<=-420&&(this.ground.x=-360)},birdFloat:function(){this.fpscount%40<20?this.bird.y+=this.birdFloatSpeed:this.bird.y-=this.birdFloatSpeed,this.fpscount+=1},pillarMove:function(){this.pillar1.x-=this.groundSpeed,this.pillar2.x-=this.groundSpeed,this.pillar1.x<=-430&&(this.pillar1.x=430,this.pillar1.y=700*Math.random()-280),this.pillar2.x<=-430&&(this.pillar2.x=430,this.pillar2.y=700*Math.random()-280),this.getScore()&&(this.score+=1,this.scoreDisplay.string="Score: "+this.score)},getScore:function(){return this.pillar1.x<=-135&&this.pillar1.x>-135-this.groundSpeed||(this.pillar2.x<=-135&&this.pillar2.x>-135-this.groundSpeed||void 0)},isGameOverFun:function(){var i=this.bird.y<=-470||this.bird.y>=1e3,t=Math.abs(this.bird.y-this.pillar1.y)>this.pillar1.height/2-this.bird.height/2,r=Math.abs(this.pillar1.x-this.bird.x)<this.bird.width/2+this.pillar1.width/2,e=t&&r,s=Math.abs(this.bird.y-this.pillar2.y)>this.pillar1.height/2-this.bird.height/2,o=Math.abs(this.pillar2.x-this.bird.x)<this.bird.width/2+this.pillar2.width/2;if(i||e||s&&o)return!0},gameOver:function(){this.bird.getComponent(cc.Animation).stop(),this.node.off(cc.Node.EventType.TOUCH_START,this.touchFunction,this),this.bird.stopAllActions();var i=cc.callFunc(function(){this.button.active=!0},this),t=cc.sequence(this.bird.spawn,i);this.bird.runAction(t)},update:function(i){0==this.bird.isprepared&&this.birdFloat(),1==this.bird.isprepared&&(this.title.active=!1,this.scoreDisplay.node.active=!0),1==this.bird.isprepared&&0==this.isGameOver&&(this.groundMove(),this.pillarMove()),this.isGameOverFun()&&(this.isGameOver=!0,1==this.firstTimeEnd&&(this.gameOver(),this.firstTimeEnd=!1))}}),cc._RF.pop()},{}]},{},["game"]);