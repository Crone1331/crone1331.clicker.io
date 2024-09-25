import {
    Sprite,
    Container,
    Assets,
    Text,
} from "pixi.js";
import {gsap} from "gsap";
import {Howl} from 'howler';

export default class Screen {
    public player = new Container();
    protected score = new Text()
    protected clickValue = 0;
    protected isAlien1 = true;

    constructor() {
        this.init();
    }

    protected async init(): Promise<void> {
        await this.drawPlayer();
        this.drawScore()
    }

    protected drawScore(): void {
        this.score.text = `Score: ${this.clickValue}`;
        this.player.addChild(this.score);
    }

    protected async drawPlayer(): Promise<void> {
        const texture = new Sprite(await Assets.load('assets/happy.png'))
        texture.eventMode = 'static';
        texture.cursor = 'pointer';
        texture.scale = 3;

        var sound = new Howl({
            src: ['assets/sound/play.mp3'],
            html5: true,
        });

        const alien1texture = await Assets.load('assets/happy.png');
        const alien2texture = await Assets.load('assets/sad.png');
        texture.on('pointertap', () => {
            setTimeout(() => {
                sound.play();
            });
            this.isAlien1 = !this.isAlien1;
            this.clickValue = this.clickValue += 1;
            this.score.text = `Score: ${this.clickValue}`;
            texture.texture = this.isAlien1 ? alien1texture : alien2texture;

            const tl = gsap.timeline()
            tl.to(texture, {
                pixi: {
                    scale: 5,
                },
                onComplete: () => {
                    tl.to(texture, {
                        pixi: {
                            scale: 3,
                        },
                    })
                    this.isAlien1 = !this.isAlien1;
                    texture.texture = this.isAlien1 ? alien1texture : alien2texture;
                },
                onUpdate: () => {
                },
                duration: 0.2,
            })
        });
        this.player.addChild(texture);
        texture.anchor.set(0.5);
        texture.x = 300;
        texture.y = 400;

    }
}
