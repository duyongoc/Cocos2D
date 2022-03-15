
import { _decorator, Component, Node } from 'cc';
import { UIManager } from '../UIManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = UIBase
 * DateTime = Wed Feb 16 2022 21:46:38 GMT+0700 (Indochina Time)
 * Author = oduy
 * FileBasename = UIBase.ts
 * FileBasenameNoExtension = UIBase
 * URL = db://assets/NotLeaveTheBowl/scripts/ui/UIBase.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

@ccclass('UIBase')
export class UIBase extends Component {


    @property
    isShowInit: boolean = false;


    onLoad() {
        this.isShowInit ? this.show() : this.hide();
    }


    show() {
        this.node.active = true;
    }

    hide() {
        this.node.active = false;
    }

    init(uiManager: UIManager) {

    }

}
