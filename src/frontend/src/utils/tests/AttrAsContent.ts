import Vue from "vue";
import { VNodeData } from "vue/types/umd";

export default function AttrAsContent(attribute: (string | ((attrs: any) => any)), vnodeData?: VNodeData | undefined) {
    return Vue.extend({
        render: function (r) {

            let value;
            if (typeof attribute === "string") {
                value = (this! as Vue).$attrs[attribute];
            }
            else {
                value = attribute((this! as Vue).$attrs);
            }

            if (typeof value === "string") {
                return r("span", vnodeData, value);
            }

            return r("span", vnodeData, JSON.stringify(value));
        }
    });
}
