
import { _decorator, Component, Node, Vec2, Vec3, SpriteFrame, tween, Sprite, TweenSystem, Prefab, instantiate } from 'cc';
import Config from './config/Config';
import { StaticInstance } from './StaticInstance';
import { PhysicsManager } from './utils/PhysicsManager';
const { ccclass, property } = _decorator;

interface IMidConfig {
    level: number,
    count: number,
    node: Node
}


@ccclass('GameManager')
export class GameManager extends Component {


    @property(Prefab) foodPrefabs: Prefab[] = []
    @property(Node) foods: Node | undefined;


    @property(Node) bowl: Node | undefined;
    @property(SpriteFrame) openEyeBowl: SpriteFrame;
    @property(SpriteFrame) closeEyeBowl: SpriteFrame;


    midConfig: IMidConfig = {
        level: 0,
        count: 0,
        node: null
    }


    onLoad() {
        StaticInstance.setGameManager(this);
        PhysicsManager.openPhysicsSystem();

        console.log(Config);
    }

    gameStart(level: number) {
        console.log(`level: ${level} and ${Config[level]}`);
        this.showBowl();

        const firstIndex = Config[level][0];
        this.midConfig.level = level;
        this.midConfig.count = 0;
        this.midConfig.node = this.addFood(firstIndex);
    }


    addFood(index: number) {
        const food = instantiate(this.foodPrefabs[index]);
        this.foods.addChild(food);
        food.setPosition(new Vec3(0, 0));
        PhysicsManager.setRigidBodyStatic(food);

        this.midConfig.count += 1;
        this.updateLevelInfo();
        return food;
    }


    updateLevelInfo() {
        const level = this.midConfig.level;
        const nowItem = this.midConfig.count;
        const allNum = Config[level].length;
        StaticInstance.uiManager.setLevelInfo(level, nowItem, allNum);
    }


    showBowl() {
        this.bowl.active = true;
        TweenSystem.instance.ActionManager.removeAllActionsFromTarget(this.bowl);

        tween(this.bowl).repeatForever(
            tween()
                .delay(2)
                .call(() => { this.bowl.getComponent(Sprite).spriteFrame = this.closeEyeBowl; })
                .delay(2)
                .call(() => { this.bowl.getComponent(Sprite).spriteFrame = this.openEyeBowl; })
        ).start();
    }

    hideBowl() {
        this.bowl.active = false;
    }


    onRotateFood(angle: number) {
        if (!this.midConfig.node)
            return;

        this.midConfig.node.angle = angle;
    }


    onClickLeftFood(dt: number) {
        if (!this.midConfig.node)
            return;

        let vecPos = this.midConfig.node.position;
        vecPos = new Vec3(vecPos.x - dt * 100, vecPos.y, vecPos.z);
        this.midConfig.node.position = vecPos;
    }

    onClickRightFood(dt: number) {
        if (!this.midConfig.node)
            return;

        let vecPos = this.midConfig.node.position;
        vecPos = new Vec3(vecPos.x + dt * 100, vecPos.y, vecPos.z);
        this.midConfig.node.position = vecPos;
    }

    onClickDownFood() {
        if (!this.midConfig.node)
            return;

        var node = this.midConfig.node;
        PhysicsManager.setRigidBodyDynamic(node);
        PhysicsManager.setRigidBodyLinearVelocity(node, new Vec2(0, -10));
    }

}
