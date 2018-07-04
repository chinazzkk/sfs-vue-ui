import ToastComponent from './sfs-toast'
import mergeOptions from '../helper/sfs-merge-options'
let $vm
let watcher

const plugin = {
    install (vue,pluginOptions) {
        const Toast = vue.extend(ToastComponent)
        if (!$vm) {
            $vm = new Toast({
                el: document.createElement('div')
            })
            document.body.appendChild($vm.$el)
        }

        mergeOptions($vm, Object.assign({}, pluginOptions))

        const toast = {
            show (options = {}) {
                watcher && watcher()
                console.log("sfs-toast show function",options)
                if (typeof options === 'object'){
                    mergeOptions($vm, Object.assign({}, pluginOptions, options))
                }
                if (typeof options === 'object' && options.onShow || options.onHide) {
                    watcher = $vm.$watch('show', (val) => {
                        val && options.onShow && options.onShow($vm)
                        val === false && options.onHide && options.onHide($vm)
                    })
                }
                $vm.show = true
            },
            hide () {
                $vm.show = false
            },
            isVisible () {
                return $vm.show
            }
        }

        if (!vue.$sfs) {
            vue.$sfs = {
                toast
            }
        } else {
            vue.$sfs.toast = toast
        }

        vue.mixin({
            created: function () {
                this.$sfs = vue.$sfs
            }
        })
    }
}



export default plugin
export const install = plugin.install
