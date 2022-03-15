
import { _decorator, Component, Node, CCObject, Label, Prefab } from 'cc';
import { UIManager } from '../UIManager';
import { Utils } from '../utils/Utils';
import { UIBase } from './UIBase';
const { ccclass, property } = _decorator;


@ccclass('LevelSelect')
export class LevelSelect extends UIBase {

    @property(Node) backButton: Node;
    @property(Node) levelsRoot: Node;


    onLoad() {
        super.onLoad();
    }


    show() {
        super.show();

        this.levelsRoot.children.forEach((node, index) => {
            const labelNode = node.children[1];
            if (!labelNode) return;

            const labelComp = labelNode.getComponent(Label);
            const level = index + 1;
            labelComp.string = level <= 3 ? "easy" : "medium";
        });
    }


    init(uiManager: UIManager) {
        this.backButton.on(Node.EventType.TOUCH_START, () => {
            Utils.clickDownTween(this.backButton);
        }, this);

        this.backButton.on(Node.EventType.TOUCH_END, () => {
            Utils.clickUpTween(this.backButton, () => { uiManager.toStartMenu(); });
        }, this);

        this.backButton.on(Node.EventType.TOUCH_CANCEL, () => {
            Utils.clickUpTween(this.backButton);
        }, this);


        this.levelsRoot.children.forEach((node, index) => {
            const button = node.children[0];

            if (!button) return;

            button.on(Node.EventType.TOUCH_START, () => {
                Utils.clickDownTween(button);
            }, this);

            button.on(Node.EventType.TOUCH_END, () => {
                Utils.clickUpTween(button, () => {
                    const level = index + 1;
                    console.log(level);
                    uiManager.gameStart(level);
                });
            }, this);

            button.on(Node.EventType.TOUCH_CANCEL, () => {
                Utils.clickUpTween(button);
            }, this);

        });
    }

}
