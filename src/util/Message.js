
/**
 * 显示消息
 * @author liumy2009@126.com
 * @since 2018-11-15 
 */
export default {
    showMsg: function (comp, msg) {
        let parent = comp.$parent;
        while (parent) {
            if (parent.showSnakbar) {
                parent.showSnakbar(msg);
                break;
            }
            parent = parent.$parent;
        }
    }
}
