import "reflect-metadata"
import * as PIXI from "pixi.js";
import {container} from 'tsyringe'
import MainScreen from './components/screen';
import {gsap} from "gsap";
import {PixiPlugin} from "gsap/PixiPlugin";

async function init() {
  const app = new PIXI.Application();
  await app.init({
    width: 600,
    height: 800,
    background: '#1099bb'
  });

  gsap.registerPlugin(PixiPlugin);
  PixiPlugin.registerPIXI(PIXI);

  const appContainer = document.querySelector('#app')
  if (appContainer) appContainer.appendChild(app.canvas)
  container.register('app', {useValue: app})
  app.stage.addChild(new MainScreen().player)
}

init();
