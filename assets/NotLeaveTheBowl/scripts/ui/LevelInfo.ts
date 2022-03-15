import { _decorator, Component, Node, Label, CCObject } from 'cc';
import { UIBase } from './UIBase';
const { ccclass, property } = _decorator;


@ccclass('LevelInfo')
export class LevelInfo extends UIBase {

    @property(Label) nowLevelLabel: Label | undefined
    @property(Label) nowItemsLabel: Label | undefined


    onLoad() {
        super.onLoad();
    }


    setLevelLabel(level: number) {
        this.nowLevelLabel.string = `Current Level: ${level}`
    }


    setItemsLabal(nowNum: number, allNum: number) {
        this.nowItemsLabel.string = `${nowNum} / ${allNum}`;
    }

}
