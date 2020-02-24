type PropType<T> = { (): T } | { new(...args: any[]): T & object }

interface PropOptions<TValueType> {
  type: PropType<TValueType>;
  value?: TValueType | null;
  observer?: (
    newVal: TValueType,
    oldVal: TValueType,
    changedPath: (string | number)[],
  ) => void;
  optionalTypes?: PropType<TValueType>[];
}

type RecordPropsDefinition<TProp> = {
  [K in keyof TProp]: PropOptions<TProp[K]> | PropType<TProp[K]>
}



declare interface WxComponent<TProp, TData, TMethod> {
  /** 组件的文件路径 */
  is: string;
  /** 节点id */
  id: string;
  /**
   * 节点dataset
   */
  dataset: Record<string, any>;

  properties: Readonly<TProp>;
  /**
   * 组件的内部数据，和 `properties` 一同用于组件的模板渲染
   */
  data: Readonly<TData & TProp>;

  /**
   * 设置data并执行视图层渲染
   */
  setData(
    /** 这次要改变的数据
     *
     * 以 `key: value` 的形式表示，将 `this.data` 中的 `key` 对应的值改变成 `value`。
     *
     * 其中 `key` 可以以数据路径的形式给出，支持改变数组中的某一项或对象的某个属性，如 `array[2].message`，`a.b.c.d`，并且不需要在 this.data 中预先定义。
     */
    data: Partial<this['data']> & Record<string, any>,
    /** setData引起的界面更新渲染完毕后的回调函数，最低基础库： `1.5.0` */
    callback?: (data: this['data']) => void,
  ): void;
  /** 检查组件是否具有 `behavior` （检查时会递归检查被直接或间接引入的所有behavior） */
  hasBehavior(behavior: object): void;
  /** 触发事件，参见组件事件 */
  triggerEvent(name: string, detail?: any, options?: TriggerEventOption): void;
  /** 创建一个 SelectorQuery 对象，选择器选取范围为这个组件实例内 */
  createSelectorQuery(): wx.SelectorQuery;
  /** 创建一个 IntersectionObserver 对象，选择器选取范围为这个组件实例内 */
  createIntersectionObserver(
    options: wx.CreateIntersectionObserverOption,
  ): wx.IntersectionObserver;
  /** 使用选择器选择组件实例节点，返回匹配到的第一个组件实例对象（会被 `wx://component-export` 影响） */
  selectComponent(selector: string): WxComponent<any, any, any>;
  /** 使用选择器选择组件实例节点，返回匹配到的全部组件实例对象组成的数组 */
  selectAllComponents(selector: string): WxComponent<any, any, any>[];
  /** 获取这个关系所对应的所有关联节点，参见 组件间关系 */
  getRelationNodes(relationKey: string): WxComponent<any, any, any>[];
  /** 立刻执行 callback ，其中的多个 setData 之间不会触发界面绘制（只有某些特殊场景中需要，如用于在不同组件同时 setData 时进行界面绘制同步）*/
  groupSetData(callback?: () => void): void;
  /** 返回当前页面的 custom-tab-bar 的组件实例
   *
   * 注意: 在基础库 < 2.5.0 时该方法可能会不存在, 需要先判断 getTabBar 方法是否存在 */
  getTabBar<TD = any, TM = any, TP = {}>(): WxComponent<TP, TD, TM> | null;
}

declare interface TriggerEventOption {
  /**
   * 事件是否冒泡
   *
   * 默认值： `false`
   */
  bubbles?: boolean;
  /**
   * 事件是否可以穿越组件边界，为false时，事件将只能在引用组件的节点树上触发，不进入其他任何组件内部
   *
   * 默认值： `false`
   */
  composed?: boolean;
  /**
   * 事件是否拥有捕获阶段
   *
   * 默认值： `false`
   */
  capturePhase?: boolean;
}

declare interface ComponentLifetimes {
  /** 组件生命周期函数，在组件实例进入页面节点树时执行，注意此时不能调用 `setData` */
  created?(): void;
  /** 组件生命周期函数，在组件实例进入页面节点树时执行 */
  attached?(): void;
  /** 组件生命周期函数，在组件布局完成后执行，此时可以获取节点信息（使用 [SelectorQuery]((SelectorQuery))） */
  ready?(): void;
  /** 组件生命周期函数，在组件实例被移动到节点树另一个位置时执行 */
  moved?(): void;
  /** 组件生命周期函数，在组件实例被从页面节点树移除时执行 */
  detached?(): void;
  /** 组件生命周期函数，每当组件方法抛出错误时执行 */
  error?(error: Error): void;
}

declare interface PageLifetimes {
  /** 页面生命周期回调—监听页面显示
   *
   * 页面显示/切入前台时触发。
   */
  show?(): void;
  /** 页面生命周期回调—监听页面隐藏
   *
   * 页面隐藏/切入后台时触发。 如 `navigateTo` 或底部 `tab` 切换到其他页面，小程序切入后台等。
   */
  hide?(): void;

  /** 页面生命周期回调—监听页面尺寸变化
   *
   * 所在页面尺寸变化时执行
   */
  resize?(Size?: Page.IResizeOption): void;
}

declare interface RelationOption<TProp = {}, TData = {}, TMethod = {}> {
  /** 目标组件的相对关系 */
  type: 'parent' | 'child' | 'ancestor' | 'descendant';
  /** 关系生命周期函数，当关系被建立在页面节点树中时触发，触发时机在组件attached生命周期之后 */
  linked?(target: WxComponent<TProp, TData, TMethod>): any;
  /** 关系生命周期函数，当关系在页面节点树中发生改变时触发，触发时机在组件moved生命周期之后 */
  linkChanged?(target: WxComponent<TProp, TData, TMethod>): any;
  /** 关系生命周期函数，当关系脱离页面节点树时触发，触发时机在组件detached生命周期之后 */
  unlinked?(target: WxComponent<TProp, TData, TMethod>): any;
  /** 如果这一项被设置，则它表示关联的目标节点所应具有的behavior，所有拥有这一behavior的组件节点都会被关联 */
  target?: string;
}


type DefinitionFilter<TThis> = (
  defFields: TThis,
  definitionFilterArr?: DefinitionFilter<TThis>[],
) => void;

declare interface ComponentOptions {
  multipleSlots?: boolean;
  addGlobalClass?: boolean;
  pureDataPattern?: any;
}

type ThisComponent<TProp, TData, TMethod extends Record<string, Function>, TExt> = ThisType<WxComponent<TProp, TData, TMethod> & { properties: TProp, data: TData & TProp } & TMethod & TExt>
interface BaseComponet<TProp, TData, TMethod extends Record<string, Function>, TExt = {}> {
  /**
  * 组件的对外属性，是属性名到属性设置的映射表
  */
  properties?: RecordPropsDefinition<TProp> & ThisComponent<TProp, TData, TMethod, TExt>,

  /**
   * 组件的内部数据，和 `properties` 一同用于组件的模板渲染
   */
  data?: TData
  /**
   * 组件数据字段监听器，用于监听 properties 和 data 的变化
   */
  observers?: Record<string, Function> & ThisComponent<TProp, TData, TMethod, TExt>;
  /**
   * object组件的方法，包括事件响应函数和任意的自定义方法，关于事件响应函数的使用，参见 [组件事件](events.md)
   */
  methods?: TMethod & ThisComponent<TProp, TData, TMethod, TExt>,
  /**
   * 组件间关系定义，参见 [组件间关系](relations.md)
   */
  relations?: {
    [componentName: string]: RelationOption & ThisComponent<TProp, TData, TMethod, TExt>;
  };

  /**
   * 组件接受的外部样式类，参见 [外部样式类](wxml-wxss.md)
   */
  externalClasses?: string[];
  /**
   * 一些选项（文档中介绍相关特性时会涉及具体的选项设置，这里暂不列举）
   */
  options?: ComponentOptions;
  /**
   * 组件生命周期声明对象，组件的生命周期：`created`、`attached`、`ready`、`moved`、`detached` 将收归到 `lifetimes` 字段内进行声明，原有声明方式仍旧有效，如同时存在两种声明方式，则 `lifetimes` 字段内声明方式优先级最高
   *
   * 最低基础库： `2.2.3`
   */
  lifetimes?: ComponentLifetimes & ThisComponent<TProp, TData, TMethod, TExt>;
  /** 组件所在页面的生命周期声明对象，目前仅支持页面的 `show` 和 `hide` 两个生命周期
   *
   * 最低基础库： `2.2.3`
   */
  pageLifetimes?: PageLifetimes & ThisComponent<TProp, TData, TMethod, TExt>;

  behaviors?: (string | WxBehavior<any, any, any>)[],
  /**
   * 定义段过滤器，用于自定义组件扩展，参见 [自定义组件扩展](extend.md)
   *
   * 最低基础库： `2.2.3`
   */
  definitionFilter?: DefinitionFilter<ThisComponent<TProp, TData, TMethod, TExt>>;
}

/**
 * 组件构造器
 * @param options 组件构造对象
 * @template TProp properties 类型,不设置会自动推断
 * @template TData 数据格式类型
 * @template TMethod 函数表类型
 */
declare function Component<
  TProp,
  TData = {},
  TMethod extends Record<string, Function> = Record<string, Function>,
  TExt = {}
>(
  options: TExt & BaseComponet<TProp, TData, TMethod, Partial<TExt>>
): void;
