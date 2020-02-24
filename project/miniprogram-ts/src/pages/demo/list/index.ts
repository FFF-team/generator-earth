const pageStart = 0;
// const pageSize = 15;

const testData = [
    {
        title: '这个绝望的世界没有存在的价值，所剩的只有痛楚',
        description: '思念、愿望什么的都是一场空，被这种虚幻的东西绊住脚，什么都做不到',
    },
    {
        title: '我早已闭上了双眼，我的目的，只有在黑暗中才能实现',
        description: '有太多的羁绊只会让自己迷惘，强烈的想法和珍惜的思念，只会让自己变弱',
    },
    {
        title: '感受痛苦吧，体验痛苦吧，接受痛苦吧，了解痛苦吧。不知道痛苦的人是不会知道什么是和平',
        description: '但我已经在无限存在的痛苦之中，有了超越凡人的成长。从凡人化为神',
    },
    {
        title: '我决定了 从今天起 我要选择一条不会让自己后悔的路 我要创造出属于自己的忍道 ',
        description: '我才不要在这种时候放弃,即使当不成中忍,我也会通过其他的途径成为火影的,这就是我的忍道',
    },
    {
        title: '为什么你会这么弱？就是因为你对我的仇恨...还不够深...',
        description: '你没有杀的价值...愚蠢的弟弟啊...想要杀死我的话...仇恨吧！憎恨吧！然后丑陋地活下去吧！逃吧 逃吧...然后苟且偷生下去吧！',
    },
    {
        title: '对于忍者而言怎样活着无所谓，怎样死去才是最重要的...',
        description: '所谓的忍者就是忍人所不能忍，忍受不了饿肚子，而沦落为盗贼的人，根本不能称之为忍者',
    },
    {
        title: '在这世上，有光的地方就必定有黑暗，所谓的胜者，也就是相对败者而言',
        description: '若以一己之思念要维持和平，必会招致战争，为了守护爱，变回孕育出恨。此间因果，是无法斩断的。现实就是如此',
    },
    {
        title: '世界上...只有没有实力的人,才整天希望别人赞赏...',
        description: '很不巧的是我只有一个人，你说的那些家伙们已经一个都没有了，已经??全部被杀死了',
    },
    {
        title: '千代婆婆，父亲大人和母亲大人回来了吗？？？',
        description: '明明剩下的只有痛苦了，既然你这么想活命，我就方你一条生路好了。不过，你中的毒不出三日就会要了你的命',
    },
    {
        title: '艺术就是爆炸！！~~ 嗯 ~~ 芸术は爆発します！',
        description: '我的艺术就是爆炸那一瞬，和蝎那种让人吃惊的人偶喜剧从根本上就是不同的！',
    },
];

Page({
    data: {
        dTabCur: 0,
        dTabList: ['推荐', '精选集锦', '最新体验', '资料', '版本', '攻略', '排行', '热门'],
        dDuration: 300, // swiper-item 切换过渡时间

        dCategoryData: [
            {
                requesting: false,
                end: false,
                emptyShow: false,
                page: pageStart,
                listData: [],
            },
            {
                requesting: false,
                end: false,
                emptyShow: false,
                page: pageStart,
                listData: [],
            },
            {
                requesting: false,
                end: false,
                emptyShow: false,
                page: pageStart,
                listData: [],
            },
            {
                requesting: false,
                end: false,
                emptyShow: false,
                page: pageStart,
                listData: [],
            },
            {
                requesting: false,
                end: false,
                emptyShow: false,
                page: pageStart,
                listData: [],
            },
            {
                requesting: false,
                end: false,
                emptyShow: false,
                page: pageStart,
                listData: [],
            },
            {
                requesting: false,
                end: false,
                emptyShow: false,
                page: pageStart,
                listData: [],
            },
            {
                requesting: false,
                end: false,
                emptyShow: false,
                page: pageStart,
                listData: [],
            },
        ],
    },

    // 第一次加载延迟 350 毫秒 防止第一次动画效果不能完全体验
    onLoad() {
        setTimeout(() => {
            this.getList('refresh', pageStart);
        }, 350);
    },

    // 切换tab后，判断是否为加载新的页面,如果是去加载数据
    toggleLoadData() {
        const pageData = this.getCurrentData();

        if (pageData.listData.length === 0) {
            this.getList('refresh', pageStart);
        }
    },

    // 顶部tab切换事件
    toggleTab(e: any) {
        this.setData({
            dDuration: 0,
        });
        setTimeout(() => {
            this.setData({
                dTabCur: e.detail.index,
            });
            this.toggleLoadData();
        }, 0);
    },

    // 页面滑动切换事件
    swipeChange(e: any) {
        this.setData({
            ddDuration: 300,
        });
        setTimeout(() => {
            this.setData({
                dTabCur: e.detail.current,
            });
            this.toggleLoadData();
        }, 0);
    },

    // 下拉列表刷新数据事件
    refresh() {
        this.getList('refresh', pageStart);
    },

    // 上拉列表加载更多事件
    more() {
        this.getList('more', this.getCurrentData().page);
    },

    // 获取数据列表
    getList(type: string, currentPage: number) {
        const pageData: any = this.getCurrentData();

        // 页面状态变为加载中
        pageData.requesting = true;

        this.updateCategoryData(pageData);

        // 显示顶部导航条loading
        wx.showNavigationBarLoading();

        // 模拟wx.request
        setTimeout(() => {
            // 页面状态变为加载完毕
            pageData.requesting = false;

            // 关闭顶部导航条loading
            wx.hideNavigationBarLoading();

            if (type === 'refresh') {
                pageData.listData = testData;
                pageData.page = currentPage + 1;
                pageData.end = false;
            } else {
                pageData.listData = pageData.listData.concat(testData);
                pageData.page = currentPage + 1;
                // 假装请求到最后一页了，标记列表请求结束，这里需要total和list.length比较，或者后端返回标记最后一页
                pageData.end = true;
            }

            this.updateCategoryData(pageData);
        }, 200);
    },

    // 更新页面数据
    updateCategoryData(pageData: any) {
        const { dCategoryData } = this.data;

        dCategoryData[this.data.dTabCur] = pageData;
        this.setData({
            dCategoryData,
        });
    },

    // 获取当前激活页面的数据
    getCurrentData() {
        return this.data.dCategoryData[this.data.dTabCur];
    },

});
