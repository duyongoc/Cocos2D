
import { _decorator, Component, Node, CCObject, tween, Vec3 } from 'cc';
import { UIManager } from '../UIManager';
import { Utils } from '../utils/Utils';
import { UIBase } from './UIBase';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Menu
 * DateTime = Wed Feb 16 2022 21:50:22 GMT+0700 (Indochina Time)
 * Author = oduy
 * FileBasename = Menu.ts
 * FileBasenameNoExtension = Menu
 * URL = db://assets/NotLeaveTheBowl/scripts/ui/Menu.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

@ccclass('Menu')
export class Menu extends UIBase {

    @property(Node) startButton: Node;
    @property(Node) levelSelectButton: Node;


    onLoad() {
        console.log('Menu onload');
        super.onLoad();
    }


    show() {
        super.show();

        const node = this.startButton.children[0];
        node.angle = 0;

        tween(node).repeatForever(
            tween()
                .to(1, { angle: 10 })
                .to(1, { angle: 0 })
        ).start();
    }

    init(uiManager: UIManager) {

        this.startButton.on(Node.EventType.TOUCH_START, () => {
            Utils.clickDownTween(this.startButton);
        }, this);

        this.startButton.on(Node.EventType.TOUCH_END, () => {
            Utils.clickUpTween(this.startButton, () => { uiManager.gameStart(0); });
        }, this);

        this.startButton.on(Node.EventType.TOUCH_CANCEL, () => {
            Utils.clickUpTween(this.startButton);
        }, this);


        //
        this.levelSelectButton.on(Node.EventType.TOUCH_START, () => {
            Utils.clickDownTween(this.levelSelectButton);
        }, this);

        this.levelSelectButton.on(Node.EventType.TOUCH_END, () => {
            Utils.clickUpTween(this.levelSelectButton, () => { uiManager.toLevelSelect(); });
        }, this);

        this.levelSelectButton.on(Node.EventType.TOUCH_CANCEL, () => {
            Utils.clickUpTween(this.levelSelectButton);
        }, this);

    }


}
