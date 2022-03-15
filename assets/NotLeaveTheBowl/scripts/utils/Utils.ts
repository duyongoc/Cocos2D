import { Node, tween, Vec3 } from "cc";


export class Utils {

    static clickDownTween(node: Node) {
        if (!node)
            return;
        tween(node).to(0.1, { scale: new Vec3(0.9, 0.9, 0.9) }).start();
    }
    static clickUpTween(node: Node | undefined, callback?: () => void) {
        if (!node)
            return;

        tween(node).to(0.1, { scale: new Vec3(1, 1, 1) }).call(() => {

            if (callback != null)
                callback();
        }).start();
    }

}