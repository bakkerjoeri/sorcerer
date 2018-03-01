!function(t){var e={};function i(s){if(e[s])return e[s].exports;var o=e[s]={i:s,l:!1,exports:{}};return t[s].call(o.exports,o,o.exports,i),o.l=!0,o.exports}i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:s})},i.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){"use strict";i.r(e);class s{constructor(t){this.setSize(t),this.viewports=[],this.entities=[]}step(t){this.entities.forEach(e=>{e.step(t)}),this.viewports.filter(t=>t.isActive()).forEach(e=>{e.step(t)})}draw(t){this.viewports.filter(t=>t.isActive()).forEach(e=>{e.draw(t,this.canvas)})}addViewport(t){this.viewports.push(t),t.setRoom(this)}useCanvas(t){this.canvas=t,this.context=t.getContext("2d")}addGameObject(t){this.entities.push(t)}getEntities(){return this.entities}setSize(t){this.size=t}getSize(){return this.size}setBackgroundColor(t){this.backgroundColor=t}getBackgroundColor(){return this.backgroundColor}drawBackground(t,e,i){t.fillStyle=this.backgroundColor,t.fillRect(e.x,e.y,i.width,i.height),t.strokeStyle="#bad455",t.strokeRect(e.x,e.y,i.width,i.height)}}const o={position:{x:0,y:0},origin:{x:0,y:0},active:!0};class n{constructor(t,e={}){this.setSize(t),e=Object.assign({},o,e),this.position=e.position,this.origin=e.origin,e.active?this.activate():this.deactivate()}activate(){this.active=!0}deactivate(){this.active=!1}isActive(){return this.active}setRoom(t){this.room=t}followGameObject(t){this.gameObjectToFollow=t}setSize(t){this.size=t}step(){if(this.gameObjectToFollow&&this.gameObjectToFollow.sprite&&this.gameObjectToFollow.sprite.size){let t={x:this.gameObjectToFollow.position.x-this.size.width/2+this.gameObjectToFollow.sprite.size.width/2,y:this.gameObjectToFollow.position.y-this.size.height/2+this.gameObjectToFollow.sprite.size.height/2};t.x<0&&(t.x=0),t.y<0&&(t.y=0),t.x>this.room.size.width-this.size.width&&(t.x=this.room.size.width-this.size.width),t.y>this.room.size.height-this.size.height&&(t.y=this.room.size.height-this.size.height),this.position=t}}draw(t,e){let i=e.getContext("2d");this.clearDrawing(e.getContext("2d")),this.room.drawBackground(i,{x:this.origin.x,y:this.origin.y},{width:this.size.width,height:this.size.height}),this.room.entities.filter(t=>t.visible).forEach(i=>{i.draw(t,e,this)})}drawMiddle(t){t.strokeStyle="#bad455",t.beginPath(),t.moveTo(this.origin.x,this.origin.y),t.lineTo(this.origin.x+this.size.width,this.origin.y+this.size.height),t.stroke(),t.beginPath(),t.moveTo(this.origin.x+this.size.width,this.origin.y),t.lineTo(this.origin.x,this.origin.y+this.size.height),t.stroke()}clearDrawing(t){t.clearRect(this.origin.x,this.origin.y,this.size.width,this.size.height)}}class r{constructor(t,e,i,s){this.setName(t),this.setImage(e),this.setOrigin(i),this.setSize(s)}setName(t){this.name=t}setImage(t){this.imageLoaded=!1,this.image=t,this.image.addEventListener("load",()=>{this.imageLoaded=!0})}setOrigin(t){this.origin=t}setSize(t){this.size=t}getName(){return this.name}getImage(){return this.image}getOrigin(){return this.origin}getSize(){return this.size}onImageLoaded(t){this.imageLoaded?t():this.image.addEventListener("load",t)}}const h={origin:{x:0,y:0},frameIndex:0,framesPerSecond:1,looping:!0};class a{static createFromDefinition(t){let e=function(t){let e=[];if(t.hasOwnProperty("file")){let i=new Image;i.src=t.file,t.cells.forEach(t=>{let s=new r(t.name,i,t.origin,t.size);e.push(s)})}return e}(t),i=t.frames.map(t=>e.find(e=>e.getName()===t));return new a(i,{framesPerSecond:t.framesPerSecond||0,origin:t.origin||{x:0,y:0}})}constructor(t,e={}){this.setFrames(t),(e=Object.assign({},h,e)).hasOwnProperty("size")?this.size=e.size:this.size=function(t){let e=0,i=0;return t.forEach(t=>{t.size.width>e&&(e=t.size.width),t.size.height>i&&(i=t.size.height)}),{width:e,height:i}}(this.getFrames()),this.setOrigin(e.origin),this.setCurrentFrameIndex(e.frameIndex),this.setFramesPerSecond(e.framesPerSecond),this.looping=e.looping,this.timeOfPreviousFrame=0}setFrames(t=[]){Array.isArray(t)?this.frames=t:this.frames=t instanceof r?[t]:[]}getFrames(){return this.frames}setFramesPerSecond(t){this.framesPerSecond=t}getFramesPerSecond(){return this.framesPerSecond}setCurrentFrameIndex(t){this.frames[t]&&(this.currentFrameIndex=t)}getCurrentFrame(){return this.frames[this.currentFrameIndex]}step(t){let e=this.getFramesPerSecond();if(0!==e&&(this.looping||this.currentFrameIndex!==this.frames.length-1)){let i=(t-this.timeOfPreviousFrame)/(1e3/e);i>0&&(i=Math.floor(i)),i<0&&(i=Math.ceil(i)),0!==i&&(this.timeOfPreviousFrame=t,this.setCurrentFrameIndex(l(this.currentFrameIndex,i,this.frames.length,this.looping)))}}draw(t,e,i){let s=e.getContext("2d"),o=this.getCurrentFrame();o&&s.drawImage(o.getImage(),o.getOrigin().x,o.getOrigin().y,o.getSize().width,o.getSize().height,i.x,i.y,this.size.width,this.size.height)}nextFrame(){this.currentFrameIndex=l(this.currentFrameIndex,1,this.frames.length,this.looping)}previousFrame(){this.currentFrameIndex=l(this.currentFrameIndex,-1,this.frames.length,this.looping)}setOrigin(t){this.origin=t}getOrigin(){return this.origin}}function l(t,e,i,s=!0){if(0===(e=Math.round(e)))return t;if(s){let s=(t+e)%i;return s<0?s+i:s}if(!s){let s=t+e;return s>i-1?i-1:s<0?0:s}}class c{static loadFile(t,e){if("json"===e)return function(t){return fetch(t,{method:"GET",headers:new Headers({"Content-Type":"application/json"})}).then(t=>t.json())}(t);throw new Error(`Unable to load files of type "${e}"`)}}const d="SPRITE",u=new Map;let g;class p{static async loadLibrary(t){g=this.library=await c.loadFile(t,"json")}static get(t,e){return u.has(t)||e===d&&u.set(t,function(t){let e=g.find(e=>e.name===t);if(!e)throw new Error(`No sprite found for "${t}"`);return a.createFromDefinition(e)}(t)),u.get(t)}}const m=[];class v{static startTicking(){!async function t(e){for(let t of e.slice(0))0===t.time&&(await t.action(),e.splice(e.indexOf(t),1));e.forEach(t=>{t.time>0?t.time=t.time-1:t.time=0});t(e)}(m)}static schedule(t,e){if(e<0)throw new Error("Cannot schedule an item in the past");m.push({action:t,time:e})}static unschedule(t){m.splice(m.indexOf(t),1)}}class w{constructor(t={}){this.room=t.room,this.level=t.level}start(){if(!this.level)throw new Error("Cannot start without a level.");window.requestAnimationFrame(this.loop.bind(this)),v.startTicking(this.level.actors)}loop(t){if(!this.room)throw new Error("Cannot start updating without a room.");this.room.step(t),this.room.draw(t),window.requestAnimationFrame(this.loop.bind(this))}}class y{constructor(t){this.position=t,this.actors=[],this.structures=[]}addActor(t){this.actors.push(t)}removeActor(t){let e=this.actors.indexOf(t);-1!==e&&this.actors.splice(e,1)}addStructure(t){this.structures.push(t)}removeStructure(t){let e=this.structures.findIndex(t);-1!==e&&this.actors.splice(e,1)}getEntities(){return this.structures.concat(this.actors)}getActors(){return this.actors}getSolidEntities(t=[]){return this.getEntities().filter(e=>!0===e.solid&&!t.includes(e))}getSolidActors(t=[]){return this.getActors().filter(e=>!0===e.solid&&!t.includes(e))}hasSolidEntities(t=[]){return this.getSolidEntities(t).length>0}hasSolidActors(t=[]){return this.getSolidActors(t).length>0}}class f{constructor(t,e){this.size=t,this.room=e,this.tiles=function(t){let e=[];for(let i=0;i<t.width;i+=1){e[i]=[];for(let s=0;s<t.height;s+=1)e[i][s]=new y({x:i,y:s})}return e}(t),this.actors=[],this.structures=[]}addActor(t,e){t.level=this,this.actors.push(t),this.forEachTileInBoundaries(e,t.sizeInLevel,e=>{e.addActor(t)}),t.setPositionInLevel(e),this.room.addGameObject(t)}addStructure(t,e){t.level=this,this.structures.push(t),this.forEachTileInBoundaries(e,t.sizeInLevel,e=>{e.addStructure(t)}),t.setPositionInLevel(e),this.room.addGameObject(t)}findTileAtPosition(t){return this.tiles[t.x][t.y]}forEachTile(t){this.tiles.forEach(e=>{e.forEach(t)})}forEachTileInBoundaries(t,e,i){for(let s=t.x;s<t.x+e.width;s+=1)for(let o=t.y;o<t.y+e.height;o+=1){let t={x:s,y:o};this.hasTileAtPosition(t)&&i(this.findTileAtPosition(t))}}hasTileAtPosition(t){return Boolean(this.tiles[t.x]&&this.tiles[t.x][t.y])}moveActorFromPositionToPosition(t,e,i){this.forEachTileInBoundaries(e,t.sizeInLevel,e=>{e.removeActor(t)}),this.forEachTileInBoundaries(i,t.sizeInLevel,e=>{e.addActor(t)}),t.setPositionInLevel(i)}getSolidEntitiesInBoundaries(t,e,i=[]){let s=[];return this.forEachTileInBoundaries(t,e,t=>{s=s.concat(t.getSolidEntities(i))}),s}hasSolidEntitiesInBoundaries(t,e,i=[]){return this.getSolidEntitiesInBoundaries(t,e,i).length>0}getSolidActorsInBoundaries(t,e,i=[]){let s=[];return this.forEachTileInBoundaries(t,e,t=>{s=s.concat(t.getSolidActors(i))}),s}hasSolidActorsInBoundaries(t,e,i=[]){return this.getSolidActorsInBoundaries(t,e,i).length>0}areBoundariesWithinLevelBoundaries(t,e){return t.x>=0&&t.y>=0&&t.x+e.width<=this.size.width&&t.y+e.height<=this.size.height}}const x={spriteName:"",position:{x:0,y:0},positioning:"absolute",size:{width:0,height:0},solid:!0,visible:!0};class I{constructor(t={}){t=Object.assign({},x,t),this.setSprite(t.spriteName),this.setPosition(t.position),this.setPositioning(t.positioning),this.setSize(t.size),this.setSolidity(t.solid),this.setVisibility(t.visible),this.events=new Map}step(t){this.sprite&&this.sprite.step(t)}draw(t,e,i){e.getContext("2d");if(this.hasOwnProperty("sprite")&&this.hasOwnProperty("position")&&this.position.hasOwnProperty("x")&&this.position.hasOwnProperty("y")){let s;s=(this.positioning="absolute")?{x:this.position.x+this.sprite.origin.x-(i.position.x-i.origin.x),y:this.position.y+this.sprite.origin.y-(i.position.y-i.origin.y)}:{x:this.position.x+this.sprite.origin.x,y:this.position.y+this.sprite.origin.y},this.sprite.draw(t,e,s)}}useSpriteWithName(t){t.length>0&&this.setSprite(p.get(t,"SPRITE"))}setSprite(t){this.sprite=t}setPosition(t){this.position=t}setPositioning(t){this.positioning=t}getPosition(){return this.position}setSolidity(t){this.solid=t}setVisibility(t){this.visible=t}show(){this.setVisibility(!0)}hide(){this.setVisibility(!1)}isSolid(){return this.solid}isVisible(){return this.visible}setSize(t){this.size=t}getSize(){return this.size}changePosition(t){let e=this.getPosition();this.setPosition({x:e.x+t.x,y:e.y+t.y})}addEventListener(t,e,i={},s=!0){return!function(){let t=!1;try{let e=Object.defineProperty({},"passive",{get:function(){t=!0}});window.addEventListener("test",null,e),window.removeEventListener("test",null,e)}catch(t){}return t}()?window.addEventListener(t,e,s):("wheel"!==t&&"mousewheel"!==t&&"touchstart"!==t&&"touchmove"!==t||(i.passive=!0),window.addEventListener(t,e,i,s)),function(t,e,i,s,o){let n=function t(e,i=6){const s=2+i;let o=Math.random().toString(36).substring(2,s);if(e.has(o))return t(e,i);return o}(t);return t.set(n,new Map([["type",e],["callback",i],["options",s],["useCapture",o]])),n}(this.events,t,e,i,s)}removeEventListener(t){if(this.events.has(t)){let e=this.events.get(t);window.removeEventListener(e.get("type"),e.get("callback"),e.get("options"),e.get("useCapture")),this.events.delete(t)}}removeAllEventListeners(){for(let t of this.events.keys())this.removeEvent(t)}}class z extends I{constructor(t){super(t)}setPositionInLevel(t){this.positionInLevel=t}setSizeInLevel(t){this.sizeInLevel=t}step(t){super.step(t),this.position={x:16*this.positionInLevel.x,y:16*this.positionInLevel.y},this.size={width:16*this.sizeInLevel.width,height:16*this.sizeInLevel.height}}}const L=document.querySelector(".js-log");class S{static showMessage(t){let e=document.createElement("li");e.classList.add("log__item"),e.innerHTML=t,L.appendChild(e)}}const P={strength:1,maxHealth:1,moveCost:100,attackCost:100};class b extends z{constructor(t,e){super(e),this.applyCreatureDefinition(t),v.schedule(this.takeAction.bind(this),0,this)}applyCreatureDefinition(t){this.type=t.type,this.applyStats(t.stats),this.useSpriteWithName(t.spriteName),this.setSizeInLevel(t.size),this.setSolidity(t.solid),this.setDeathrattle(t.deathrattle)}applyStats(t){this.stats=Object.assign({},P,t),(void 0===this.health||this.health>this.stats.maxHealth)&&(this.health=this.stats.maxHealth)}setDeathrattle(t){"function"==typeof t&&(this.deathrattle=t.bind(this))}takeAction(){return new Promise(t=>{t()})}wait(){v.schedule(this.takeAction.bind(this),this.stats.moveCost,this)}canMove(){return this.canMoveToPosition({x:this.positionInLevel.x+1,y:this.positionInLevel.y})||this.canMoveToPosition({x:this.positionInLevel.x,y:this.positionInLevel.y+1})||this.canMoveToPosition({x:this.positionInLevel.x-1,y:this.positionInLevel.y})||this.canMoveToPosition({x:this.positionInLevel.x,y:this.positionInLevel.y-1})}canMoveToPosition(t){return this.level.hasTileAtPosition(t)&&!this.level.hasSolidEntitiesInBoundaries(t,this.sizeInLevel,[this])&&this.level.areBoundariesWithinLevelBoundaries(t,this.sizeInLevel)}moveTo(t){return this.level.moveActorFromPositionToPosition(this,this.positionInLevel,t),v.schedule(this.takeAction.bind(this),this.stats.moveCost,this),!0}canAttackPosition(t){return this.level.getSolidActorsInBoundaries(t,this.sizeInLevel,[this]).some(t=>t.canBeAttacked())}attackPosition(t){let e=this.level.getSolidActorsInBoundaries(t,this.sizeInLevel,[this]).filter(t=>t.canBeAttacked());return 0!==e.length&&(e.forEach(t=>{this.attackTarget(t)}),!0)}attackTarget(t){S.showMessage(`<em>${this.type}</em> attacks <em>${t.type}</em>`),t.applyDamage(this.calculateAttackDamage()),v.schedule(this.takeAction.bind(this),this.stats.attackCost,this)}calculateAttackDamage(){return this.stats.strength}applyDamage(t){S.showMessage(`<em>${this.type}</em> takes ${t} damage`),this.reduceHealth(t)}restoreHealth(t){this.changeHealth(this.health+t)}reduceHealth(t){this.changeHealth(this.health-t)}changeHealth(t){t>this.stats.maxHealth?(this.health=this.stats.maxHealth,S.showMessage(`<em>${this.type}</em> health max at ${this.health}`)):t<=0?(this.health=0,this.die()):(this.health=t,S.showMessage(`<em>${this.type}</em> health is ${this.health}/${this.stats.maxHealth}`))}canBeAttacked(){return!this.dead}die(){this.dead=!0,this.solid=!1,delete this.sprite,"function"==typeof this.deathrattle&&this.deathrattle(this.level),S.showMessage(`<em>${this.type}</em> is dead`)}}class k extends b{constructor(t,e){super(t,e),S.showMessage(`<em>${this.type}</em> awakens...`)}takeAction(){return new Promise(t=>{this.dead?(v.schedule(this.takeAction.bind(this),this.stats.moveCost,this),window.setTimeout(t,1e3)):this.keyDownEvent=this.addEventListener("keydown",e=>{this.handleKeyPressed(e,t)})})}handleKeyPressed(t,e){let i=!1;" "!==t.key&&"5"!==t.key||(t.preventDefault(),S.showMessage(`${this.type} waits...`),this.wait(),i=!0),"ArrowUp"!==t.key&&"8"!==t.key||(t.preventDefault(),i=this.actNorth()),"ArrowRight"!==t.key&&"6"!==t.key||(t.preventDefault(),i=this.actEast()),"ArrowDown"!==t.key&&"2"!==t.key||(t.preventDefault(),i=this.actSouth()),"ArrowLeft"!==t.key&&"4"!==t.key||(t.preventDefault(),i=this.actWest()),i&&(this.removeEventListener(this.keyDownEvent),e())}actTowardPosition(t){return this.canMoveToPosition(t)?this.moveTo(t):!!this.canAttackPosition(t)&&this.attackPosition(t)}actNorth(){let t={x:this.positionInLevel.x,y:this.positionInLevel.y-1};return this.actTowardPosition(t)}actEast(){let t={x:this.positionInLevel.x+1,y:this.positionInLevel.y};return this.actTowardPosition(t)}actSouth(){let t={x:this.positionInLevel.x,y:this.positionInLevel.y+1};return this.actTowardPosition(t)}actWest(){let t={x:this.positionInLevel.x-1,y:this.positionInLevel.y};return this.actTowardPosition(t)}}class A{constructor(t){this.owner=t,this.goals=[]}act(){this.processGoal(this.goals[0])}processGoal(t){if(!t.isFinished())return 0===t.subGoals.length&&t.takeAction(this.owner).catch(()=>(t.originalGoal.subGoals.length=0,this.processGoal(t.originalGoal))),t.subGoals.length>0?this.processGoal(t.subGoals[0]):void 0;t.originalGoal&&(t.originalGoal.subGoals.splice(t.originalGoal.subGoals.indexOf(t),1),this.processGoal(t.originalGoal))}processFinishedGoal(t){t.originalGoal.subGoals.splice(t.originalGoal.subGoals.indexOf(t),1)}processFailedGoal(t){t.originalGoal.subGoals.length=0}}class T{constructor(t){this.subGoals=[],this.originalGoal=t}takeAction(){throw new Error("This method should be implemented.")}isFinished(){throw new Error("This method should be implemented.")}}class E extends T{constructor(t){super(t),this.moved=!1}takeAction(t){return new Promise((e,i)=>{if(t.dead)return i();let s={x:t.positionInLevel.x,y:t.positionInLevel.y-1};return t.canMoveToPosition(s)?(t.moveTo(s),this.moved=!0,e()):i()})}isFinished(){return this.moved}}class F extends T{constructor(t){super(t),this.moved=!1}takeAction(t){return new Promise((e,i)=>{if(t.dead)return i();let s={x:t.positionInLevel.x+1,y:t.positionInLevel.y};return t.canMoveToPosition(s)?(t.moveTo(s),this.moved=!0,e()):i()})}isFinished(){return this.moved}}class O extends T{constructor(t){super(t),this.moved=!1}takeAction(t){return new Promise((e,i)=>{if(t.dead)return i();let s={x:t.positionInLevel.x,y:t.positionInLevel.y+1};return t.canMoveToPosition(s)?(t.moveTo(s),this.moved=!0,e()):i()})}isFinished(){return this.moved}}class C extends T{constructor(t){super(t),this.moved=!1}takeAction(t){return new Promise((e,i)=>{if(t.dead)return i();let s={x:t.positionInLevel.x-1,y:t.positionInLevel.y};return t.canMoveToPosition(s)?(t.moveTo(s),this.moved=!0,e()):i()})}isFinished(){return this.moved}}class G extends T{takeAction(t){return new Promise(e=>{if(!t.canMove())return t.wait(),e();let i=Math.floor(4*Math.random())+1;for(let t=0;t<i;t++){let t=Math.floor(4*Math.random());0===t&&this.subGoals.push(new E(this)),1===t&&this.subGoals.push(new F(this)),2===t&&this.subGoals.push(new O(this)),3===t&&this.subGoals.push(new C(this))}return e()})}isFinished(){return!1}}class M extends b{constructor(t,e){super(t,e),this.brain=new A(this),this.brain.goals.push(new G)}takeAction(){return new Promise(t=>{this.dead||this.brain.act(),t()})}}class B extends z{constructor(t,e){super(e),this.applyStructureDefinition(t)}applyStructureDefinition(t){this.type=t.type,this.useSpriteWithName(t.spriteName),this.setSizeInLevel(t.size),this.setSolidity(t.solid),this.setCanBeAttacked(t.canBeAttacked)}setCanBeAttacked(t=!1){this.canBeAttacked=t}}const j={type:"grave",spriteName:"grave",size:{width:1,height:1},solid:!0},D={type:"knight",stats:{maxHealth:10,strength:3,moveCost:100,attackCost:100},spriteName:"knight",size:{width:1,height:1},solid:!0,deathrattle:function(t){t.addStructure(new B(j),this.positionInLevel)}},N={type:"green knight",stats:{maxHealth:10,strength:3,moveCost:100,attackCost:100},spriteName:"greenknight",size:{width:1,height:1},solid:!0,deathrattle:function(t){t.addStructure(new B(j),this.positionInLevel)}},H={type:"slime",stats:{maxHealth:16,strength:1,moveCost:200,attackCost:200},spriteName:"slime",size:{width:1,height:1},solid:!0},$={type:"king slime",stats:{maxHealth:28,strength:2,moveCost:400,attackCost:400},spriteName:"kingslime",size:{width:2,height:2},solid:!0,deathrattle:function(t){t.addActor(new M(H),this.positionInLevel),t.addActor(new M(H),{x:this.positionInLevel.x+1,y:this.positionInLevel.y}),t.addActor(new M(H),{x:this.positionInLevel.x,y:this.positionInLevel.y+1}),t.addActor(new M(H),{x:this.positionInLevel.x+1,y:this.positionInLevel.y+1})}},R={type:"tree",spriteName:"tree",size:{width:1,height:1},solid:!0},W={type:"wall",spriteName:"wall",size:{width:1,height:1},solid:!0},_=240,V=176,q=36,K=24,U=16;function J(t){return 1===Math.round(Math.random()*t)}!async function(){await p.loadLibrary("assets/sprites.json");const t=document.querySelector(".canvas__sorcerer");t.width=_,t.height=V;const e=new s({width:q*U,height:K*U});e.setBackgroundColor("#000"),e.useCanvas(t);const i=new f({width:q,height:K},e),o=new k(N);i.addActor(o,{x:q/2,y:K/2}),function(t){t.forEachTile(e=>{if(!e.hasSolidEntities()){if(J(40))return void t.addActor(new M(H),e.position);if(J(240))return void t.addActor(new M(D),e.position);if(J(40))return void t.addStructure(new B(R),e.position);if(J(200))return void t.addStructure(new B(j),e.position);if(J(80))return void t.addStructure(new B(W),e.position)}!t.hasSolidEntitiesInBoundaries(e.position,$.size)&&t.areBoundariesWithinLevelBoundaries(e.position,$.size)&&J(240)&&t.addActor(new M($),e.position)})}(i);const r=new n({width:_,height:V},{origin:{x:0,y:0}});r.followGameObject(o),e.addViewport(r),new w({room:e,level:i}).start()}()}]);