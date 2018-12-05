
/**
 * 验证form
 * @author liumy2009@126.com
 * @since 2018-11-27
 */
export default {
    async validate(validator, headers) {
        var rst = true;
        for (var i = 0; i < headers.length; i++) {
            let header = headers[i];
            if (header.validate && header.text) {
                const result = await validator.validate(header.text);
                if (!result) {
                    rst = result;
                }
            }
        }
        return rst;
    }
}
