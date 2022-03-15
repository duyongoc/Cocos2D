import { _decorator, Component, Node, director, PhysicsSystem2D, EPhysics2DDrawFlags, RigidBody2D, ERigidBody2DType, Vec2 } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('PhysicsManager')
export class PhysicsManager extends Component {


    static openPhysicsSystem() {
        PhysicsSystem2D.instance.enable = true;
        PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.All;
    }

    static closePhysicsSystem() {
        PhysicsSystem2D.instance.enable = false;
        PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.None;
    }


    static setRigidBodyStatic(node: Node) {
        let body = node.getComponent(RigidBody2D);
        body.type = ERigidBody2DType.Static;
    }

    static setRigidBodyDynamic(node: Node) {
        let body = node.getComponent(RigidBody2D);
        body.type = ERigidBody2DType.Dynamic;
    }

    static setRigidBodyLinearVelocity(node: Node, vec: Vec2) {
        let body = node.getComponent(RigidBody2D);
        body.linearVelocity = vec;
    }




}
