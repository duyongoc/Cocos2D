
import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
import { UIType } from './Enum';
import { StaticInstance } from './StaticInstance';
import { ControlPanel } from './ui/ControlPanel';
import { LevelInfo } from './ui/LevelInfo';
import { LevelSelect } from './ui/LevelSelect';
import { Menu } from './ui/Menu';
import { UIBase } from './ui/UIBase';
const { ccclass, property } = _decorator;


@ccclass('UIManager')
export class UIManager extends Component {

    @property(Prefab) menuPrefab: Prefab;
    @property(Prefab) levelSelectPrefab: Prefab;
    @property(Prefab) controlPanelPrefab: Prefab;
    @property(Prefab) levelInfoPrefab: Prefab;


    uiMap = new Map<UIType, UIBase>();


    onLoad() {
        StaticInstance.setUIManager(this);

        this.initMenu();
        this.initLevelSelect();
        this.initControlPanel();
        this.initLevelInfoPanel();
    }


    gameStart(level: number) {
        this.showUI([UIType.ControlPanel, UIType.levelInfo]);
        StaticInstance.gameManager.gameStart(level);
    }

    toLevelSelect() {
        this.showUI([UIType.LevelSelect]);
    }

    toStartMenu() {
        this.showUI([UIType.Menu]);
    }

    setLevelInfo(level: number, nowItem: number, allNum: number) {
        const levelInfo = this.uiMap.get(UIType.levelInfo) as LevelInfo;
        levelInfo.setLevelLabel(level);
        levelInfo.setItemsLabal(nowItem, allNum);
    }


    onRotateFood(angle: number) {
        StaticInstance.gameManager.onRotateFood(angle);
    }


    onClickLeftFood(dt: number) {
        StaticInstance.gameManager.onClickLeftFood(dt);
    }

    onClickRightFood(dt: number) {
        StaticInstance.gameManager.onClickRightFood(dt);
    }

    onClickDownFood() {
        StaticInstance.gameManager.onClickDownFood();
    }


    showUI(showTypes: UIType[]) {
        this.uiMap.forEach((ui, type) => {
            if (showTypes.includes(type)) {
                ui.show();
            } else {
                ui.hide();
            }
        });
    }


    private initMenu() {
        const node = instantiate(this.menuPrefab);
        this.node.addChild(node);
        node.setPosition(0, 0);

        var comp = node.getComponent(Menu);
        comp.init(this);
        this.uiMap.set(UIType.Menu, comp);
    }

    private initLevelSelect() {
        const node = instantiate(this.levelSelectPrefab);
        this.node.addChild(node);
        node.setPosition(0, 0);

        var comp = node.getComponent(LevelSelect);
        comp.init(this);
        this.uiMap.set(UIType.LevelSelect, comp);
    }

    private initControlPanel() {
        const node = instantiate(this.controlPanelPrefab);
        this.node.addChild(node);
        node.setPosition(0, 0);

        var comp = node.getComponent(ControlPanel);
        comp.init(this);

        this.uiMap.set(UIType.ControlPanel, comp);
    }

    private initLevelInfoPanel() {
        const node = instantiate(this.levelInfoPrefab);
        this.node.addChild(node);
        node.setPosition(0, 0);

        var comp = node.getComponent(LevelInfo);
        comp.init(this);

        this.uiMap.set(UIType.levelInfo, comp);
    }


}
