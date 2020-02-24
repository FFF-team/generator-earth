

declare interface WxBehavior<TProp, TData, TMethod> extends WxComponent<TProp, TData, TMethod> {

}

interface BaseBehavior<TProp, TData, TMethod extends Record<string, Function>, TExt = {}>
//  extends ComponentLifetimes
{
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
    // observers?: Record<string, Function> & ThisComponent<TProp, TData, TMethod, TExt>;
    /**
     * object组件的方法，包括事件响应函数和任意的自定义方法，关于事件响应函数的使用，参见 [组件事件](events.md)
     */
    methods?: TMethod & ThisComponent<TProp, TData, TMethod, TExt>,
    // /**
    //  * 组件间关系定义，参见 [组件间关系](relations.md)
    //  */
    // relations?: {
    //     [componentName: string]: RelationOption & ThisComponent<TProp, TData, TMethod, TExt>;
    // };

    // /**
    //  * 组件接受的外部样式类，参见 [外部样式类](wxml-wxss.md)
    //  */
    // externalClasses?: string[];
    // /**
    //  * 一些选项（文档中介绍相关特性时会涉及具体的选项设置，这里暂不列举）
    //  */
    // options?: ComponentOptions;

    // /** 组件所在页面的生命周期声明对象，目前仅支持页面的 `show` 和 `hide` 两个生命周期
    //  *
    //  * 最低基础库： `2.2.3`
    //  */
    // pageLifetimes?: PageLifetimes & ThisComponent<TProp, TData, TMethod, TExt>;

    behaviors?: (string | WxBehavior<any, any, any>)[],

    /**
     * 定义段过滤器，用于自定义组件扩展，参见 [自定义组件扩展](extend.md)
     *
     * 最低基础库： `2.2.3`
     */
    // definitionFilter?: DefinitionFilter<ThisComponent<TProp, TData, TMethod, TExt>>;
}



type BehiavorLifeTimes<
    TExt extends ComponentLifetimes,
    TProp,
    TData,
    TMethod extends Record<string, Function> = Record<string, Function>,
    > = ComponentLifetimes & TExt & ThisComponent<TProp, TData, TMethod, TExt>

/**
 * Behavior 构造器
 * @see https://developers.weixin.qq.com/miniprogram/dev/reference/api/Behavior.html
 * @param options
 */
declare function Behavior<
    TProp,
    TData = {},
    TMethod extends Record<string, Function> = Record<string, Function>,
    TExt extends ComponentLifetimes = {},
    >(
        options: BehiavorLifeTimes<TExt, TProp, TData, TMethod> & BaseBehavior<TProp, TData, TMethod, TExt>
    ): WxBehavior<TProp, TData, TMethod>;
