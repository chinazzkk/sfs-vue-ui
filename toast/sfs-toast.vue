<template>
    <div class="sfs-toast-box">
        <div class="sfs-mask_transparent" v-show="isShowMask && show"></div>
        <transition :name="currentTransition">
            <div class="sfs-toast sfs-bg-black" :class="toastClass" v-show="show">
                <div class="sfs-toast-icon"></div>
                <div class="text" v-html="text"></div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "sfs-toast",
        props: {
            value: Boolean,
            time: {
                type: Number,
                default: 2000
            },
            isShowMask: {
                type: Boolean,
                default: false
            },
            position: {
                default: 'middle',
                type: String
            },
            text: {
                default: '',
                type: String
            },
            type: {
                default: 'warn'
            }
        },
        data() {
            return {
                show: false,
                timeout: undefined
            }
        },
        watch: {
            show(val) {
                if (val) {
                    this.$emit('input', true)
                    this.$emit('on-show')
                    clearTimeout(this.timeout)
                    this.timeout = setTimeout(() => {
                        this.show = false
                        this.$emit('input', false)
                        this.$emit('on-hide')
                    }, this.time)
                }
            },
            value(val) {
                this.show = val
            }
        },
        computed: {
            currentTransition() {
                if (this.transition) {
                    return this.transition
                }
                if (this.position === 'top') {
                    return 'sfs-slide-from-top'
                }
                if (this.position === 'bottom') {
                    return 'sfs-slide-from-bottom'
                }
                return 'sfs-slide-from-middle'
            },
            toastClass() {
                return {
                    'sfs-toast_warn': this.type === 'warn',
                    'sfs-toast_warn_2': this.type === 'warn2',
                    'sfs-toast_success': this.type === 'success',
                    'sfs-toast_error': this.type === 'error',
                    'sfs-toast_text': this.type === 'text',
                    'sfs-toast-top': this.position === 'top',
                    'sfs-toast-bottom': this.position === 'bottom',
                    'sfs-toast-middle': this.position === 'middle'
                }
            },
        }
    }
</script>

<style scoped>
    @import "../css/main.css";
    .sfs-toast-box .sfs-toast-top {
        top: 5%;
    }

    .sfs-toast-box .sfs-toast-middle {
        top: 50%;
    }

    .sfs-toast-box .sfs-toast-bottom {
        bottom: 5%;
    }

    .sfs-toast-box .text{
        text-align: center;
        display: inline-block;
        font-weight: 300;
    }

    .sfs-toast-icon {
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        min-height: 2rem;
        min-width: 2rem;
        box-sizing: border-box;
        padding: 1rem;
        margin-bottom: .5rem;
        margin-top: .5rem;
    }

    .sfs-toast_error .sfs-toast-icon {
        background-image: url("../assets/error.svg");
    }
    .sfs-toast_success .sfs-toast-icon {
        background-image: url("../assets/ok.svg");
    }

    .sfs-toast_warn .sfs-toast-icon {
        background-image: url("../assets/alert-fill.svg");
    }

    .sfs-toast_warn_2 .sfs-toast-icon {
        background-image: url("../assets/alert.svg");
    }

    .sfs-toast-box .sfs-toast {
        display: inline-block;
        padding: .5rem 1rem;
        position: fixed;
        left: 50%;
        color: #fff;
        transform: translate(-50%, -50%);
        border-radius: .2rem;
        z-index:9999;
    }

</style>
