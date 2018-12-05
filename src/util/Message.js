
/**
 * 显示消息
 * @author liumy2009@126.com
 * @since 2018-11-15 
 */
export default {
    showMsg: function (comp, msg) {
        if (comp.snackbar != undefined) {
            comp.message = msg;
            comp.snackbar = true;
            return;
        }

        let parent = comp.$parent;
        while (parent) {
            if (parent.snackbar != undefined) {
                parent.message = msg;
                parent.snackbar = true;
                break;
            }
            parent = parent.$parent;
        }
    }
}
