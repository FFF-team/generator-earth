Component({
    options: {
        pureDataPattern: /^_/, // 指定所有 _ 开头的数据字段为纯数据字段
    },

    externalClasses: ['my-class'],

    properties: {
        // 数据源
        tabList: {
            type: Array,
            value: [],
            observer() {
                this.setData({
                    dScrolling: false,
                });
                // 异步加载数据时候, 延迟执行 init 方法, 防止基础库 2.7.1 版本及以下无法正确获取 dom 信息
                setTimeout(() => this.init(), 10);
            },
        },
        // 当前展示tab索引值
        tabCur: {
            type: Number,
            value: 0,
            observer(newVal: number) {
                this.scrollByIndex(newVal);
            },
        },
        // 是否可以超出滚动
        scroll: {
            type: Boolean,
            value: false,
        },
    },

    data: {
        /* 纯数据字段 */
        _windowWidth: 0, // 屏幕宽度
        _tabDoms: [], // 所有 tab 节点信息

        /* 渲染数据 */
        dScrolling: true, // 控制 scroll-view 滚动以在异步加载数据的时候能正确获得 dom 信息
        dScrollLeft: 0, // scroll-view 左边滚动距离

        dNeedLineTransition: false, // 下划线是否需要过渡动画
        dLineWidth: 0, // 下划 line 宽度
        dLinetranslateX: 0, // 下划 line 的左边距离
    },

    lifetimes: {
        ready() {
            this.init();
        },
    },

    methods: {
        /* 初始化函数 */
        init() {
            const { windowWidth } = wx.getSystemInfoSync();

            this.setData({ _windowWidth: windowWidth || 375 });

            this.createSelectorQuery()
                .selectAll('.cm-tab-scroll .tabs .content')
                .boundingClientRect()
                .exec((res: any) => {
                    this.setData({
                        dScrolling: true,
                        _tabDoms: res[0],
                    });
                    this.scrollByIndex(this.properties.tabCur, false);
                });
        },

        /**
         * 滑动到指定位置
         * @param tabCur: 当前激活的tabItem的索引
         * @param dNeedLineTransition: 下划线是否需要过渡动画, 第一次进来应设置为false
         */
        scrollByIndex(tabCur: number, dNeedLineTransition = true) {
            // 获取 action dom
            const item: any = this.data._tabDoms[tabCur];

            if (!item) return;

            const itemWidth = item.width || 0;
            const itemLeft = item.left || 0;

            const newData: any = {
                dNeedLineTransition,
                tabCur,
                dLineWidth: itemWidth,
                dLinetranslateX: itemLeft,
            };

            // 超出滚动的情况
            if (this.data.scroll) {
                // 保持滚动后当前 item '尽可能' 在屏幕中间
                newData.dScrollLeft = itemLeft - (this.data._windowWidth - itemWidth) / 2;
            }

            this.setData(newData);
        },

        /* 切换菜单 */
        toggleTab(e: any) {
            const cur = e.currentTarget.dataset.index;

            this.triggerEvent('change', { index: cur });
            // this.scrollByIndex(cur);
        },

    },

});
