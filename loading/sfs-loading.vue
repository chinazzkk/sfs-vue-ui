<template>
    <div class="sfs-loading-box">
        <div class="sfs-mask_transparent sfs-bg-black-2" v-show="isShowMask && show"></div>
        <transition :name="currentTransition">
            <div class="sfs-loading sfs-bg-black"  v-show="show">
                <img class="sfs-loading-icon" src="../assets/ic_loading.svg" />
                <span class="sfs-loading-text" v-html="text"></span>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "sfs-loading",
        props:{
            value: Boolean,
            time: {
                type: Number,
                default: 0
            },
            isShowMask:{
                type:Boolean,
                default:true
            },
            transition:{
                type:String,
                default:'middle'
            },
            text:{
                type:String,
                default:'Loading'
            }
        },
        data() {
            return {
                show: false,
                timeout: undefined
            }
        },

        computed:{
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
        },
        watch:{
            value(val) {
                this.show = val
            },
            show(val) {
                if (val) {
                    this.$emit('input', true)
                    this.$emit('on-show')
                    if(this.time > 0)
                    {
                        clearTimeout(this.timeout)
                        this.timeout = setTimeout(() => {
                            this.show = false
                            this.$emit('input', false)
                            this.$emit('on-hide')
                        }, this.time)
                    }
                }else{
                    this.$emit('input', false)
                    this.$emit('on-hide')
                }
            }
        }

    }
</script>

<style scoped>
    @import "../css/main.css";
    .sfs-loading{
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-content: center;
        align-items: center;
        z-index: 9999;
        padding: .5rem 1rem;
        position: fixed;
        left: 50%;
        top: 50%;
        color: #fff;
        transform: translate(-50%, -50%);
        border-radius: .2rem;
    }

    .sfs-loading .sfs-loading-icon{
        max-height: 15vw;
        animation: sfsRotate 1s infinite linear ;
    }

    .sfs-loading .sfs-loading-text{
        animation: sfsFontRun .8s infinite linear;
    }

    @keyframes sfsRotate
    {
        0%   {transform: rotate(-180deg) scale(1)}
        25%   {transform: rotate(-30deg) scale(1)}
        50%   {transform: rotate(0deg)  scale(1)}
        75%   {transform: rotate(30deg) scale(1)}
        100%   {transform: rotate(180deg) scale(1)}
    }

    @keyframes sfsFontRun
    {
        0%   {transform: scale(1)}
        50%   {transform: scale(1.1)}
        100%   {transform: scale(1)}
    }

</style>
