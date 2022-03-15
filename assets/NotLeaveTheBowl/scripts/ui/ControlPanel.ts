
import { _decorator, Component, Node, CCObject, Event, misc, Vec2, Vec3, v2, UITransform, Touch } from 'cc';
import { StaticInstance } from '../StaticInstance';
import { UIManager } from '../UIManager';
import { Utils } from '../utils/Utils';
import { UIBase } from './UIBase';
const { ccclass, property } = _decorator;


@ccclass('ControlPanel')
export class ControlPanel extends UIBase {


    @property(Node) clickDownButton: Node = undefined;
    @property(Node) clickLeftButton: Node = undefined;
    @property(Node) clickRightButton: Node = undefined;

    @property(Node) panelBkButton: Node = undefined;
    @property(Node) panelMidButton: Node = undefined;


    leftOpen: boolean = false;
    rightOpen: boolean = false;

    uiManager: UIManager;


    onLoad() {
        super.onLoad();
    }

    update(dt)
    {
        this.leftOpen && this.uiManager && this.uiManager.onClickLeftFood(dt);
        this.rightOpen && this.uiManager && this.uiManager.onClickRightFood(dt);
    }


    init(uiManager: UIManager) {

        this.uiManager = uiManager;
        const { TOUCH_START, TOUCH_MOVE, TOUCH_END, TOUCH_CANCEL } = Node.EventType;

        this.panelBkButton.on(TOUCH_START, (touch: Touch) => {
            var transform = this.panelBkButton.getComponent(UITransform);
            var pos = transform.convertToNodeSpaceAR(new Vec3(touch.getUIStartLocation().x, touch.getUIStartLocation().y, 0));

            var trans = this.limitMidNodePos(new Vec2(pos.x, pos.y));
            var vec = new Vec3(trans.x, trans.y, 0);
            this.panelMidButton.setPosition(pos);

            // for rotation
            let angle = misc.radiansToDegrees(Math.atan2(pos.y, pos.x));
            uiManager.onRotateFood(angle);
        });

        this.panelBkButton.on(TOUCH_MOVE, (touch: Touch) => {
            var transform = this.panelBkButton.getComponent(UITransform);
            var pos = transform.convertToNodeSpaceAR(new Vec3(touch.getUILocation().x, touch.getUILocation().y, 0));

            var trans = this.limitMidNodePos(new Vec2(pos.x, pos.y));
            var vec = new Vec3(trans.x, trans.y, 0);
            this.panelMidButton.setPosition(pos);

            // for rotation
            let angle = misc.radiansToDegrees(Math.atan2(pos.y, pos.x));
            uiManager.onRotateFood(angle);
        });

        this.panelBkButton.on(TOUCH_END, (touch: Touch) => {
            var transform = this.panelBkButton.getComponent(UITransform);
            var pos = transform.convertToNodeSpaceAR(new Vec3(touch.getUIStartLocation().x, touch.getUIStartLocation().y, 0));
            this.panelMidButton.setPosition(Vec3.ZERO);
        });


        // left button
        this.clickLeftButton.on(TOUCH_START, () => {
            Utils.clickDownTween(this.clickLeftButton);
            this.leftOpen = true;
        }, this);

        this.clickLeftButton.on(TOUCH_END, () => {
            Utils.clickUpTween(this.clickLeftButton);
            this.leftOpen = false;
        }, this);

        this.clickLeftButton.on(TOUCH_CANCEL, () => {
            Utils.clickUpTween(this.clickLeftButton);
            this.leftOpen = false;
        }, this);



        // right button
        this.clickRightButton.on(TOUCH_START, () => {
            Utils.clickDownTween(this.clickRightButton);
            this.rightOpen = true;
        }, this);

        this.clickRightButton.on(TOUCH_END, () => {
            Utils.clickUpTween(this.clickRightButton);
            this.rightOpen = false;
        }, this);
        
        this.clickRightButton.on(TOUCH_CANCEL, () => {
            Utils.clickUpTween(this.clickRightButton);
            this.rightOpen = false;
        }, this);


        // down button
        this.clickDownButton.on(TOUCH_START, () => {
            Utils.clickDownTween(this.clickDownButton);
        }, this);
        this.clickDownButton.on(TOUCH_END, () => {
            Utils.clickUpTween(this.clickDownButton);
            uiManager.onClickDownFood();
        }, this);
        this.clickDownButton.on(TOUCH_CANCEL, () => {
            Utils.clickUpTween(this.clickDownButton);
        }, this);

    }


    limitMidNodePos(pos: Vec2) {
        const R = 130
        const len = pos.mag();

        const ratio = len > R ? R / len : 1;
        return v2(pos.x * ratio, pos.y * ratio);

    }

}
