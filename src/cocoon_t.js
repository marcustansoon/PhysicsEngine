alert(PIXI);
let renderer = new PIXI.autoDetectRenderer(500,500);
        document.body.appendChild(renderer.view);
        //renderer.view.style.left = "0px";
        //renderer.view.style.top = "0px";
        //renderer.view.style.position = "absolute";
	    let stage= new PIXI.Container();
        
        
	let tex = new PIXI.Sprite.fromImage('https://i.imgur.com/uDuqK20.jpg');   
    	stage.addChild(tex);
        tex.scale.set(.5);
        loop();
        function loop(){
        	renderer.render(stage);
            requestAnimationFrame(loop);
        }
