import LoadingComponent from './sfs-loading'
import mergeOptions from '../helper/sfs-merge-options'
let $vm
let watcher

const plugin = {
    install (vue,pluginOptions) {
        const Toast = vue.extend(LoadingComponent)
        if (!$vm) {
            $vm = new Toast({
                el: document.createElement('div')
            })
            document.body.appendChild($vm.$el)
        }

        mergeOptions($vm, Object.assign({}, pluginOptions))

        const loading = {
            show (options = {}) {
                watcher && watcher()
                console.log("sfs-loading show function",options)
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
                loading
            }
        } else {
            vue.$sfs.loading = loading
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
